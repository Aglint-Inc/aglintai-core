import { jobQueries, JobRequisite } from '../job';

export const interviewPlanKeys = {
  interview_plan: (args: JobRequisite) => ({
    queryKey: [...jobQueries.job(args).queryKey, 'interview_plan'] as string[],
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
