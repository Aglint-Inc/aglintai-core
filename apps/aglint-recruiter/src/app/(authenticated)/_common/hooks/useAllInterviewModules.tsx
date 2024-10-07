import { api } from '@/trpc/client';

export const useAllInterviewModules = () => {
  const query = api.interview_pool.list.useQuery();
  return { ...query, data: query.data! };
};
