import OpenAI from 'openai';
import {openai} from '../config';
import {
  Badges,
  JobJson,
  OpenAIPrompt,
  OpenAiPromptBuilderResponse,
  ResumeJson,
} from '../types';
// import { rejectAfterDelay } from "../util";
import {getPrompts, getReasoningPrompts} from './prompts';
import {ScoringParam} from '../resultParser';
import {rejectAfterDelay} from '../util';
// import { rejectAfterDelay } from "../utils";

const TIMEOUT = 20000; // 20 sec
const RETRY_LIMIT = 3;
type PromptType = 'rating' | 'reasoning';

export const openAiRatingPromptBuilder = async (
  jobJson: JobJson,
  resumeJson: ResumeJson
): Promise<OpenAiPromptBuilderResponse | null> => {
  const prompts = getPrompts(jobJson, resumeJson, [
    'positions',
    'schools',
    'skills',
  ]);
  const result = prompts.length !== 0 ? await promptLoop(prompts) : null;
  return result;
};

export const openAiReasoningPromptBuilder = async (
  jobJson: JobJson,
  resumeJson: ResumeJson,
  resultObj: ScoringParam | null,
  badges: Badges
): Promise<OpenAiPromptBuilderResponse | null> => {
  const prompts = getReasoningPrompts(
    jobJson,
    resumeJson,
    badges,
    resultObj as ScoringParam,
    ['positions', 'schools', 'skills']
  );
  const result = prompts.length !== 0 ? await promptLoop(prompts) : null;
  return result;
};

const promptLoop = async (
  prompts: OpenAIPrompt[],
  retry = 1
): Promise<OpenAiPromptBuilderResponse> => {
  if (retry > RETRY_LIMIT) {
    return prompts.map(p => {
      return {
        data: {
          response: null,
          tries: retry,
          tag: p.tag,
          index: p.index,
          tokens: 0,
        },
        error: {message: 'Max retries attempted', prevError: p.prevError},
      };
    }) as unknown as OpenAiPromptBuilderResponse;
  }
  const promises = prompts.map(prompt => {
    return Promise.race([
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        seed: 777,
        messages:
          prompt.messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        temperature: prompt.temperature,
        response_format: {type: 'json_object'},
      }),
      rejectAfterDelay(TIMEOUT),
    ]);
  });
  // eslint-disable-next-line n/no-unsupported-features/es-builtins
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
              {prompt: prompts[i], response: curr.value},
            ],
          };
        else
          return {
            ...acc,
            missingField: [
              ...acc.missingField,
              {prompt: prompts[i], response: 'Missing field by OpenAI'},
            ],
          };
      } else
        return {
          ...acc,
          rejected: [
            ...acc.rejected,
            {prompt: prompts[i], response: 'Request timeout'},
          ],
        };
    },
    {
      fulfilled: [],
      missingField: [],
      rejected: [],
    } as ReducerObj
  );

  const {fulfilled, retries} = resultRefactor(results, retry);
  const retriedResult =
    fulfilled.length === prompts.length
      ? []
      : await promptLoop(retries, retry + 1);
  return [...fulfilled, ...retriedResult];
};

const resultRefactor = (results: ReducerObj, tries: number) => {
  const fulfilled = results.fulfilled.map(f => {
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
  const missingField = results.missingField.map(m => {
    return {
      ...m.prompt,
      temperature: m.prompt.temperature + 0.1,
      prevError: m.response,
    };
  });
  const rejected = results.rejected.map(r => {
    return {...r.prompt, prevError: r.response};
  });
  return {
    fulfilled,
    retries: [...missingField, ...rejected],
  };
};

type ReducerField = {prompt: OpenAIPrompt; response: any};
type ReducerObj = {
  fulfilled: ReducerField[];
  missingField: ReducerField[];
  rejected: ReducerField[];
};
