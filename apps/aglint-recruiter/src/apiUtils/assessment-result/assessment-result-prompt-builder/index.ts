/* eslint-disable security/detect-object-injection */
import { type AssessmentResult } from '@/src/queries/assessment/types';

import { type AssessmentResponse } from '../../../pages/api/assessment-result/result';
import { getQnaPrompt } from './prompts';

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

const validateMCQ = async (
  response: AssessmentResponse,
): Promise<AssessmentAnalysisResult> => {
  if (response.type !== 'mcq') return { analysis: null, rating: -1 };
  if (response.answer.options.length !== response.response.options.length)
    return { analysis: null, rating: 0 };
  return {
    analysis: null,
    rating: response.answer.options.reduce((acc, curr) => {
      if (acc && !response.response.options.includes(curr)) return 0;
      return acc;
    }, 10),
  };
};

export type AssessmentAnalysisResult = { analysis: string; rating: number };

const formatResponse = (
  // eslint-disable-next-line no-undef
  result: PromiseSettledResult<{ analysis: string; rating: number }>[],
  responses: AssessmentResponse[],
) => {
  return responses.reduce(
    (acc, curr, i) => {
      const res = result[i];
      const newResult: AssessmentResult['result'][number] = {
        question_id: curr.question_id,
        rating: null,
        analysis: null,
      };
      if (res.status === 'fulfilled') {
        newResult.rating = res.value.rating;
        switch (curr.type) {
          case 'mcq':
            break;
          case 'qna':
            newResult.analysis = res.value.analysis;
        }
      }
      acc.push(newResult);
      return acc;
    },
    [] as AssessmentResult['result'],
  );
};
