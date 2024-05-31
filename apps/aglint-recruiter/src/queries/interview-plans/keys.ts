import { JobRequisite } from '../job';
import { jobQueryKeys } from '../job/keys';

export const interviewPlanKeys = {
  interview_plan: (args: JobRequisite) => ({
    queryKey: [
      ...jobQueryKeys.job(args).queryKey,
      'interview_plan',
    ] as string[],
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
