import { appKey } from '..';

export const jobQueryKeys = {
  jobs: () => ({
    queryKey: [appKey, 'jobs'],
  }),
  job: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobQueryKeys.jobs().queryKey, { job_id }],
  }),
  job_polling: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobQueryKeys.jobs().queryKey, { job_id }, 'job_polling'],
  }),
  scoring_param: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobQueryKeys.jobs().queryKey, { job_id }, 'scoring_param'],
  }),
} as const;
