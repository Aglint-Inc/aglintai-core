import { api } from '@/trpc/client';

export const useJobs = () => {
  return api.jobs.read.useSuspenseQuery()[0];
};
