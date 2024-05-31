import { JobRequisite } from '../job';
import { jobQueryKeys } from '../job/keys';

export const jobScoringParamKeys = {
  scoring: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'scoring'],
  }),
} as const;
