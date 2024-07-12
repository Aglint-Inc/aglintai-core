import { appKey, noPollingKey } from '..';
import type { JobRequisite } from '../job';
import { jobQueries } from '../job';

export const jobWorkflowQueryKeys = {
  workflow: (args: JobRequisite) => ({
    queryKey: [...jobQueries.job(args).queryKey, 'workflow', noPollingKey],
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
