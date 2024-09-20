import { CompletionUsage } from "openai/resources";

import {
  AnthropicPromptBuilderResponse,
  GeminiPromptBuilderResponse,
  OpenAiPromptBuilderResponse,
  PromptResponse,
  PromptSkillResponse,
} from "../types";

export const openAiRatingResultParser = (
  results: OpenAiPromptBuilderResponse
) => {
  return results.reduce(
    (acc, curr) => {
      if (curr.data.response) {
        if (curr.data.tag === "skills") {
          return {
            ...acc,
            skills: {
              list: { ...curr.data.response },
              index: curr.data.index,
              tries: curr.data.tries,
              tokens: curr.data.tokens,
            },
          };
        } else {
          return {
            ...acc,
            [curr.data.tag]: [
              ...acc[curr.data.tag],
              {
                ...curr.data.response,
                index: curr.data.index,
                tries: curr.data.tries,
                tokens: curr.data.tokens,
              },
            ],
          };
        }
      } else {
        return acc;
      }
    },
    { schools: [], positions: [], skills: {} } as unknown as ScoringParam
  );
};

export const geminiRatingResultParser = (
  results: GeminiPromptBuilderResponse
) => {
  return results.reduce(
    (acc, curr) => {
      if (curr.data.response) {
        if (curr.data.tag === "skills") {
          return {
            ...acc,
            skills: {
              list: { ...curr.data.response },
              index: curr.data.index,
              tries: curr.data.tries,
              tokens: curr.data.tokens,
            },
          };
        } else {
          return {
            ...acc,
            [curr.data.tag]: [
              ...acc[curr.data.tag],
              {
                ...curr.data.response,
                index: curr.data.index,
                tries: curr.data.tries,
                tokens: curr.data.tokens,
              },
            ],
          };
        }
      } else {
        return acc;
      }
    },
    { schools: [], positions: [], skills: {} } as unknown as ScoringParam
  );
};

export const openAiReasoningResultParser = (
  results: OpenAiPromptBuilderResponse | null
) => {
  return results
    ? results.reduce(
        (acc, curr) => {
          if (curr.data.response) {
            return {
              ...acc,
              [curr.data.tag]: curr.data.response.reasoning,
            };
          } else {
            return acc;
          }
        },
        {
          schools: null,
          positions: null,
          skills: null,
        } as unknown as ScoringParam
      )
    : null;
};

export const anthropicResultParser = (
  results: AnthropicPromptBuilderResponse
) => {
  const obj = results[0].data.response as object;
  const tries = results[0].data.tries;
  return obj
    ? Object.entries(obj).reduce(
        (acc, [key, value]) => {
          if (key === "skills") {
            return {
              ...acc,
              skills: {
                list: { ...(value as any) } as PromptSkillResponse,
                index: 0,
                tries: tries,
                tokens: {
                  completion_tokens: 0,
                  prompt_tokens: 0,
                  total_tokens: 0,
                },
              },
            };
          } else {
            return {
              ...acc,
              [key]: [
                ...Object.entries(value as any).map(([k, v]) => {
                  return {
                    rating: v,
                    index: k,
                    tries: tries,
                    tokens: {
                      completion_tokens: 0,
                      prompt_tokens: 0,
                      total_tokens: 0,
                    },
                  };
                }),
              ],
            };
          }
        },
        { schools: [], positions: [], skills: {} } as unknown as ScoringParam
      )
    : ({ schools: [], positions: [], skills: {} } as unknown as ScoringParam);
};

export type ScoringParam = {
  schools: ScoringObj["list"];
  positions: ScoringObj["list"];
  skills: {
    list: PromptSkillResponse;
    index: number;
    tries: number;
    tokens:
      | CompletionUsage
      | {
          promptTokenCount: number;
          candidatesTokenCount: number;
          totalTokenCount: number;
        }
      | undefined;
  };
};
type ScoringObj = { score: number; list: PromptResponse[] };
