/* eslint-disable security/detect-object-injection */
import OpenAI from 'openai';

import { openai } from '../config';
import { JobJson, Prompt, PromptBuilderResponse, ResumeJson } from '../types';
import { rejectAfterDelay } from '../utils';
import { getPrompts } from './prompts';
// import { rejectAfterDelay } from "../utils";

const TIMEOUT = 20000; // 20 sec
const RETRY_LIMIT = 3;

export const promptBuilder = async (
  jobJson: JobJson,
  resumeJson: ResumeJson,
): Promise<PromptBuilderResponse | null> => {
  const prompts = getPrompts(jobJson, resumeJson, [
    'positions',
    'schools',
    'skills',
  ]);
  const result = prompts.length !== 0 ? await promptLoop(prompts) : null;
  return result;
};

const promptLoop = async (
  prompts: Prompt[],
  retry: number = 1,
): Promise<PromptBuilderResponse> => {
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
        error: { message: 'Max retries attempted', prevError: p.prevError },
      };
    }) as unknown as PromptBuilderResponse;
  }
  const promises = prompts.map((prompt) => {
    return Promise.race([
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106',
        seed: 777,
        messages:
          prompt.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        temperature: prompt.temperature,
        response_format: { type: 'json_object' },
      }),
      rejectAfterDelay(TIMEOUT),
    ]);
  });
  const responses = await Promise.allSettled([...promises]);
  const results = await responses.reduce(
    (acc, curr, i) => {
      if (curr.status === 'fulfilled') {
        const value = curr.value as OpenAI.Chat.Completions.ChatCompletion;
        if (value.choices[0].message.content)
          return {
            ...acc,
            fulfilled: [
              ...acc.fulfilled,
              { prompt: prompts[i], response: curr.value },
            ],
          };
        else
          return {
            ...acc,
            missingField: [
              ...acc.missingField,
              { prompt: prompts[i], response: 'Missing field by OpenAI' },
            ],
          };
      } else
        return {
          ...acc,
          rejected: [
            ...acc.rejected,
            { prompt: prompts[i], response: 'Request timeout' },
          ],
        };
    },
    {
      fulfilled: [],
      missingField: [],
      rejected: [],
    } as ReducerObj,
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
    const value = f.response as OpenAI.Chat.Completions.ChatCompletion;
    return {
      data: {
        response: JSON.parse(value.choices[0].message.content || '{}'),
        index: f.prompt.index,
        tag: f.prompt.tag,
        tries: tries,
        tokens: value.usage,
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

type ReducerField = { prompt: Prompt; response: any };
type ReducerObj = {
  fulfilled: ReducerField[];
  missingField: ReducerField[];
  rejected: ReducerField[];
};
