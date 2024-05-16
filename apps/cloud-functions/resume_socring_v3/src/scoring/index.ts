import { PromptResponse, PromptSkillResponse } from "../types";
import { getScore, getSkillScore } from "../util";

export const scoring = (resultObj: ScoringParam) => {
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
  schools: ScoringObj["list"];
  positions: ScoringObj["list"];
  skills: {
    list: PromptSkillResponse;
    index: number;
    tries: number;
    tokens: any;
  };
};
type ScoringObj = { score: number; list: PromptResponse[] };
