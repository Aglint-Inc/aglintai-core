import { appKey } from '..';
import type { JobRequisite } from '../job';

export const jobWorkflowMutationKeys = {
  job: (args: JobRequisite) => ({
    mutationKey: [appKey, 'jobs', args] as string[],
  }),
  delete: (args: JobRequisite) => ({
    mutationKey: [...jobWorkflowMutationKeys.job(args).mutationKey, 'DELETE'],
  }),
} as const;
