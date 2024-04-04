import { appKey } from '..';

export const jobScoringParamKeys = {
  all: { queryKey: [appKey, 'job_scoring_param'] as string[] },
  job: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobScoringParamKeys.all.queryKey, { job_id }],
  }),
} as const;
