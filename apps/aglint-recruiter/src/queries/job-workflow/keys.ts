import { appKey } from '..';
import type { JobRequisite } from '../job';
import { jobQueryKeys } from '../job/keys';

export const jobWorkflowQueryKeys = {
  workflow: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'workflow'],
  }),
} as const;

export const jobWorkflowMutationKeys = {
  job: (args: JobRequisite) => ({
    mutationKey: [appKey, 'jobs', args] as string[],
  }),
  update: (args: JobRequisite) => ({
    mutationKey: [...jobWorkflowMutationKeys.job(args).mutationKey],
  }),
  delete: (args: JobRequisite) => ({
    mutationKey: [...jobWorkflowMutationKeys.job(args).mutationKey],
  }),
} as const;
