import { PromptBuilderResponse, PromptResponse } from '../types';
import { getScore } from '../utils';

export const scoring = (results: PromptBuilderResponse) => {
  const resultObj = results.reduce(
    (acc, curr) => {
      if (curr.data.response)
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
      else return acc;
    },
    {
      schools: [] as ScoringParam['list'],
      positions: [] as ScoringParam['list'],
    },
  );
  const schoolsScore = getScore(resultObj.schools);

  const positionsScore = getScore(resultObj.positions);

  return {
    schools: { score: schoolsScore, list: resultObj.schools },
    positions: { score: positionsScore, list: resultObj.positions },
  };
};

type ScoringParam = { score: number; list: PromptResponse[] };
