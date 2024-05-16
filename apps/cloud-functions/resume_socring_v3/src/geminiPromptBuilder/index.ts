/* eslint-disable security/detect-object-injection */

import { GenerateContentResult } from "@google/generative-ai";
import { gemini } from "../config";
import {
  GeminiPrompt,
  GeminiPromptBuilderResponse,
  JobJson,
  ResumeJson,
} from "../types";
import { rejectAfterDelay } from "../util";
import { getPrompts } from "./prompts";

// import { rejectAfterDelay } from "../utils";

const TIMEOUT = 20000; // 20 sec
const RETRY_LIMIT = 3;

export const geminiRatingPromptBuilder = async (
  jobJson: JobJson,
  resumeJson: ResumeJson
) => {
  const prompts = getPrompts(jobJson, resumeJson, [
    "positions",
    "schools",
    "skills",
  ]);
  const result = prompts.length !== 0 ? await promptLoop(prompts) : null;
  return result;
};

const promptLoop = async (
  prompts: GeminiPrompt[],
  retry: number = 1
): Promise<GeminiPromptBuilderResponse> => {
  if (retry > RETRY_LIMIT) {
    return prompts.map((p) => {
      return {
        data: {
          response: null,
          tries: retry,
          tag: p.tag,
          index: p.index,
          tokens: 0,
        },
        error: { message: "Max retries attempted", prevError: p.prevError },
      };
    }) as unknown as GeminiPromptBuilderResponse;
  }
  const promises = prompts.map((prompt) => {
    return Promise.race([
      gemini.getGenerativeModel({ model: "gemini-pro" }).generateContent({
        generationConfig: {
          temperature: 0,
          topK: 1,
          topP: 1,
          maxOutputTokens: 4096,
        },
        contents: prompt.contents,
      }),
      rejectAfterDelay(TIMEOUT),
    ]) as unknown as GenerateContentResult;
  });
  const responses = await Promise.allSettled([...promises]);
  const results = await responses.reduce(
    (acc, curr, i) => {
      if (curr.status === "fulfilled") {
        const value = curr.value.response.text();
        if (value)
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
              { prompt: prompts[i], response: "Missing field by Gemini" },
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
    const value = f.response as string;
    return {
      data: {
        response:
          value.includes("```json") && value.endsWith("```")
            ? JSON.parse(
                value
                  .replace("```json", "")
                  .replace(new RegExp("```" + "$"), "") || "{}"
              )
            : JSON.parse(value) || {},
        index: f.prompt.index,
        tag: f.prompt.tag,
        tries: tries,
        tokens: {
          prompt_tokens: 0, //value.usageMetadata.promptTokenCount,
          completion_tokens: 0, // value.usageMetadata.candidatesTokenCount,
          total_tokens: 0, //value.usageMetadata.totalTokenCount,
        },
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

type ReducerField = { prompt: GeminiPrompt; response: any };
type ReducerObj = {
  fulfilled: ReducerField[];
  missingField: ReducerField[];
  rejected: ReducerField[];
};
