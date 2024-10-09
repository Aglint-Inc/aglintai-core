import { api } from '@/trpc/client';

import type { Job } from '../types';

export const useJobs = (): Job[] => {
  return api.jobs.read.useSuspenseQuery()[0];
};
