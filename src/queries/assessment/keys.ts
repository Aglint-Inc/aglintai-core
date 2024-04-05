import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { pageRoutes } from '@/src/utils/pageRouting';

import { appKey } from '..';
import { type Assessment } from './types';
export const assessmentQueryKeys = {
  templates: () => ({
    queryKey: [appKey, 'templates'],
  }),
  assessments: () => ({
    queryKey: [appKey, 'assessments'],
  }),
  assessment: ({ assessment_id }: { assessment_id: string }) => ({
    queryKey: [
      ...assessmentQueryKeys.assessments().queryKey,
      { assessment_id },
    ],
  }),
  questions: ({ assessment_id }: { assessment_id: string }) => ({
    queryKey: [
      ...assessmentQueryKeys.assessment({ assessment_id }).queryKey,
      'questions',
    ],
  }),
  question: ({
    assessment_id,
    question_id,
  }: {
    assessment_id: string;
    question_id: string;
  }) => ({
    queryKey: [
      ...assessmentQueryKeys.questions({ assessment_id }).queryKey,
      'questions',
      { question_id },
    ],
  }),
  recommendations: ({
    assessment_id,
    mode,
  }: {
    assessment_id: Assessment['id'];
    mode: Assessment['mode'];
  }) => ({
    queryKey: [
      ...assessmentQueryKeys.assessment({ assessment_id }).queryKey,
      'recommendations',
      { mode },
    ],
  }),
} as const;

export const useAssessmentId = () => {
  const router = useRouter();
  const assessment_id = (
    (router?.pathname ?? null).startsWith(pageRoutes.ASSESSMENTS)
      ? router?.query?.id ?? null
      : null
  ) as string;
  return { assessment_id };
};

export const generateUUID = () => {
  return uuidv4() as string;
};
