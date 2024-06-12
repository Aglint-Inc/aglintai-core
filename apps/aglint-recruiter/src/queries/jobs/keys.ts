import { appKey } from '..';

export const jobsQueryKeys = {
  jobs: () => ({
    queryKey: [appKey, 'jobs'],
  }),
} as const;
