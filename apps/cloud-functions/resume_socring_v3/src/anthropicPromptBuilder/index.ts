/* eslint-disable security/detect-object-injection */

import { anthropic } from "../config";
import {
  AnthropicPrompt,
  AnthropicPromptBuilderResponse,
  JobJson,
  ResumeJson,
} from "../types";
import { rejectAfterDelay } from "../util";
import { getAnthropicPrompt } from "./prompts";
import Anthropic from "@anthropic-ai/sdk";

const TIMEOUT = 120000; // 90 sec
const RETRY_LIMIT = 3;

export const anthropicPromptBuilder = async (
  jobJson: JobJson,
  resumeJson: ResumeJson
): Promise<AnthropicPromptBuilderResponse | null> => {
  const prompts = [
    getAnthropicPrompt(jobJson, resumeJson, ["positions", "schools", "skills"]),
  ];
  const result = prompts.length !== 0 ? await promptLoop(prompts) : null;
  console.log(JSON.stringify(result), "🙏🙏🙏");
  return result;
};

const promptLoop = async (
  prompts: AnthropicPrompt[],
  retry: number = 1
): Promise<AnthropicPromptBuilderResponse> => {
  if (retry > RETRY_LIMIT) {
    return prompts.map((p) => {
      return {
        data: {
          response: null,
          tries: retry,
          tokens: 0,
        },
        error: { message: "Max retries attempted", prevError: p.prevError },
      };
    }) as unknown as AnthropicPromptBuilderResponse;
  }
  const promises = prompts.map((prompt) => {
    return Promise.race([
      anthropic.completions.create({
        model: "claude-2.1",
        max_tokens_to_sample: 4000,
        prompt: prompt.prompt,
        temperature: prompt.temperature,
      }),
      rejectAfterDelay(TIMEOUT),
    ]);
  });
  const responses = await Promise.allSettled([...promises]);
  const results = await responses.reduce(
    (acc, curr, i) => {
      if (curr.status === "fulfilled") {
        const value = curr.value as Anthropic.Completions.Completion;
        if (value.completion && value.completion.includes("```json"))
          return {
            ...acc,
            fulfilled: [
              ...acc.fulfilled,
              { prompt: prompts[i], response: value },
            ],
          };
        else
          return {
            ...acc,
            missingField: [
              ...acc.missingField,
              { prompt: prompts[i], response: "Missing field by Anthropic" },
            ],
          };
      } else
        return {
          ...acc,
          rejected: [
            ...acc.rejected,
            { prompt: prompts[i], response: "Request timeout" },
          ],
        };
    },
    {
      fulfilled: [],
      missingField: [],
      rejected: [],
    } as ReducerObj
  );

  const { fulfilled, retries } = resultRefactor(results, retry);
  const retriedResult =
    fulfilled.length === prompts.length
      ? []
      : await promptLoop(retries, retry + 1);
  return [...fulfilled, ...retriedResult];
};

const resultRefactor = (results: ReducerObj, tries: number) => {
  const fulfilled = results.fulfilled.map((f) => {
    const value = f.response as Anthropic.Completions.Completion;
    return {
      data: {
        response: cleanUpResponseObj(
          JSON.parse(
            value.completion.split("```")[1].replace("json", "") || "{}"
          )
        ),
        tries: tries,
        tokens: 0,
      },
      error: null,
    };
  });
  const missingField = results.missingField.map((m) => {
    return {
      ...m.prompt,
      temperature: m.prompt.temperature + 0.1,
      prevError: m.response,
    };
  });
  const rejected = results.rejected.map((r) => {
    return { ...r.prompt, prevError: r.response };
  });
  return {
    fulfilled,
    retries: [...missingField, ...rejected],
  };
};

const cleanUpResponseObj = (obj: object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const valid =
      value && value instanceof Object && Object.entries(value).length !== 0
        ? true
        : false;
    return { ...acc, [key]: valid ? value : {} };
  }, {});
};

type ReducerField = { prompt: AnthropicPrompt; response: any };
type ReducerObj = {
  fulfilled: ReducerField[];
  missingField: ReducerField[];
  rejected: ReducerField[];
};
