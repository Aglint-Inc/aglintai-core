import { CompletionUsage } from 'openai/resources';

import {
  PromptBuilderResponse,
  PromptResponse,
  PromptSkillResponse,
} from '../types';

export const resultParser = (results: PromptBuilderResponse): ScoringParam => {
  return results.reduce(
    (acc, curr) => {
      if (curr.data.response) {
        if (curr.data.tag === 'skills') {
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
    { schools: [], positions: [], skills: {} } as ScoringParam,
  );
};

export type ScoringParam = {
  schools: ScoringObj['list'];
  positions: ScoringObj['list'];
  skills: {
    list: PromptSkillResponse;
    index: number;
    tries: number;
    tokens: CompletionUsage;
  };
};
type ScoringObj = { score: number; list: PromptResponse[] };
