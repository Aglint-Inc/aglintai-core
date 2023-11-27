import { PromptResponse, PromptSkillResponse } from './types';

export const arrayToPrompt = (header: string, content: string[]) => {
  return `${content.map((c, i) => `${header} ${i + 1}. ${c}`).join(`\n`)}`;
};

export const rejectAfterDelay = (ms) =>
  new Promise((_, reject) => {
    setTimeout(reject, ms, new Error('timeout'));
  });

export const getScore = (promptResponse: PromptResponse[]) => {
  const count = promptResponse.length;
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
};

export const getSkillScore = (promptResponse: PromptSkillResponse) => {
  const count = Object.keys(promptResponse).length;
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
};

const r = 0.25; //Inversely proportional to effectiveness of count

const getFinalScore = (score: number, count: number) => {
  return getCappedFactor(count) * getLogarithmicScore(score);
};

const getLogarithmicScore = (score: number) => {
  if (score < 1) score = 1;
  return 100 * (Math.log(score) / Math.log(100));
};

const getCappedFactor = (count: number) => {
  return 1 - r ** count;
};
