import { api } from '@/trpc/client';

export const useAllInterviewModules = () => {
  const query = api.interview_pool.interview_pool.useQuery();
  return { ...query, data: query.data! };
};
