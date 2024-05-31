import { jobsQueryKeys } from '../jobs/keys';
import type { JobRequisite } from '.';

export const jobQueryKeys = {
  job: (args: JobRequisite) => ({
    queryKey: [...jobsQueryKeys.jobs().queryKey, args],
  }),
  job_polling: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'job_polling'],
  }),
  scoring_param: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'scoring_param'],
  }),
} as const;
