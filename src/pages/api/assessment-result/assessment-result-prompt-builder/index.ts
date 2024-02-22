/* eslint-disable security/detect-object-injection */
import { AssessmentResult } from '@/src/queries/assessment/types';

import { getQnaPrompt } from './prompts';
import { AssessmentResponse } from '../result';

export const getAssessmentAnalyses = async (
  responses: AssessmentResponse[],
) => {
  const promises = responses.map((response) =>
    getAssessmentFunctions(response),
  );
  const result = await Promise.allSettled(promises);
  return formatResponse(result, responses);
};

const getAssessmentFunctions = (response: AssessmentResponse) => {
  switch (response.type) {
    case 'mcq':
      return validateMCQ(response);
    case 'qna':
      return getQnaPrompt(response);
  }
};

const validateMCQ = async (response: AssessmentResponse) => {
  if (response.type !== 'mcq') return -1;
  if (response.question.answer.options.length !== response.answer.length)
    return 0;
  return response.answer.reduce((acc, curr) => {
    if (acc && !response.question.answer.options.includes(curr)) return 0;
    return acc;
  }, 10);
};

const formatResponse = (
  // eslint-disable-next-line no-undef
  result: PromiseSettledResult<number>[],
  responses: AssessmentResponse[],
) => {
  return responses.reduce(
    (acc, curr, i) => {
      const res = result[i];
      if (res.status === 'fulfilled')
        acc.push({ question_id: curr.question_id, rating: res.value });
      return acc;
    },
    [] as AssessmentResult['result'],
  );
};
