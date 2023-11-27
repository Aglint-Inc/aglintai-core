import {
  PromptBuilderResponse,
  PromptResponse,
  PromptSkillResponse,
} from '../types';
import { getScore, getSkillScore } from '../utils';

export const scoring = (results: PromptBuilderResponse) => {
  const resultObj = results.reduce(
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
    { schools: [], positions: [], skills: {} } as unknown as ScoringParam,
  );
  const schoolsScore = getScore(resultObj.schools);
  const positionsScore = getScore(resultObj.positions);
  const skillsScore = getSkillScore(resultObj.skills.list);

  return {
    schools: { score: schoolsScore, list: resultObj.schools },
    positions: { score: positionsScore, list: resultObj.positions },
    skills: {
      score: skillsScore,
      list: resultObj.skills.list,
      index: resultObj.skills.index,
      tokens: resultObj.skills.tokens,
      tries: resultObj.skills.tries,
    },
  };
};

type ScoringParam = {
  schools: ScoringObj['list'];
  positions: ScoringObj['list'];
  skills: {
    list: PromptSkillResponse;
    index: number;
    tries: number;
    tokens: any;
  };
};
type ScoringObj = { score: number; list: PromptResponse[] };
