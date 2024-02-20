import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { pageRoutes } from '@/src/utils/pageRouting';

import { Assessment } from '.';
export const assessmentQueryKeys = {
  all: { queryKey: ['aglint_assessment'] as string[] },
  assessments: () => ({
    queryKey: [...assessmentQueryKeys.all.queryKey, 'assessments'],
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

// export const assessmentMutationKeys = {
//   all: { mutationKey: ['aglint_assessment_mutate'] as string[] },
//   assessment_create: () => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       'assessment_create',
//     ],
//   }),
//   assessment_update: ({ assessment_id }: { assessment_id: string }) => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       { assessment_update: assessment_id },
//     ],
//   }),
//   assessment_delete: ({ assessment_id }: { assessment_id: string }) => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       { assessment_delete: assessment_id },
//     ],
//   }),
//   question_create: ({ question_id }: { question_id: string }) => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       { question_create: question_id },
//     ],
//   }),
//   question_update: ({ question_id }: { question_id: string }) => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       { question_update: question_id },
//     ],
//   }),
//   question_delete: ({ question_id }: { question_id: string }) => ({
//     mutationKey: [
//       ...assessmentMutationKeys.all.mutationKey,
//       { question_delete: question_id },
//     ],
//   }),
// } as const;

export const useAssessmentId = () => {
  const router = useRouter();
  const assessment_id = (
    (router?.pathname ?? null).startsWith(pageRoutes.ASSESSMENT)
      ? router?.query?.id ?? null
      : null
  ) as string;
  return { assessment_id };
};

export const generateUUID = () => {
  return uuidv4() as string;
};
