import { appKey } from '..';

export const jobKey = 'jobs';

export const jobsQueryKeys = {
  jobs: () => ({
    queryKey: [appKey, jobKey],
  }),
} as const;
