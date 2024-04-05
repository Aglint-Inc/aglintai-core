import { appKey } from '..';

export const interviewPlanKeys = {
  interview_plan: ({ job_id }: { job_id: string }) => ({
    queryKey: [appKey, { job_id }, 'interview_plan'] as string[],
  }),
} as const;

export const interviewSessionMutationKeys = {
  all: { mutationKey: ['interview_session'] },
  update: () => ({
    mutationKey: [
      ...interviewSessionMutationKeys.all.mutationKey,
      'update',
    ] as string[],
  }),
  delete: () => ({
    mutationKey: [
      ...interviewSessionMutationKeys.all.mutationKey,
      'delete',
    ] as string[],
  }),
} as const;
