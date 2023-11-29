import { PromptResponse, PromptSkillResponse } from './types';

export const arrayToPrompt = (header: string, content: string[]) => {
  return `${content.map((c, i) => `${header} ${i + 1}. ${c}`).join(`\n`)}`;
};

export const rejectAfterDelay = (ms) =>
  new Promise((_, reject) => {
    setTimeout(reject, ms, new Error('timeout'));
  });

export const getScore = (promptResponse: PromptResponse[]) => {
  if (promptResponse) {
    const count = promptResponse.length;
    if (count === 0) return 0;
    return Math.round(
      getFinalScore(
        promptResponse.reduce((acc, curr) => {
          switch (curr.rating) {
            case 'low':
              acc += 0;
              break;
            case 'medium':
              acc += 50;
              break;
            case 'high':
              acc += 100;
              break;
          }
          return acc;
        }, 0) / count,
        count,
      ),
    );
  }
  return 0;
};

export const getSkillScore = (promptResponse: PromptSkillResponse) => {
  if (promptResponse) {
    const count = Object.keys(promptResponse).length;
    if (count === 0) return 0;
    return Math.round(
      getFinalScore(
        Object.values(promptResponse).reduce((acc, curr) => {
          switch (curr) {
            case 'low':
              acc += 0;
              break;
            case 'medium':
              acc += 50;
              break;
            case 'high':
              acc += 100;
              break;
          }
          return acc;
        }, 0) / count,
        count,
      ),
    );
  }
  return 0;
};

export const getFinalScore = (
  score: number,
  count: number,
  rFactor: number = 0.25, //Inversely proportional to effectiveness of count
) => {
  return getCappedFactor(count, rFactor) * getLogarithmicScore(score);
};

const getLogarithmicScore = (score: number) => {
  if (score < 1) score = 1;
  return 100 * (Math.log(score) / Math.log(100));
};

const getCappedFactor = (count: number, rFactor: number) => {
  return 1 - rFactor ** count;
};
