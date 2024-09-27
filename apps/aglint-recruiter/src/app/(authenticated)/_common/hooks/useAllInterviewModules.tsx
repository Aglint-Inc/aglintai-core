import { api } from '@/trpc/client';

export const useAllInterviewModules = () => {
  return api.interview_pool.interview_pool.useQuery();
};
