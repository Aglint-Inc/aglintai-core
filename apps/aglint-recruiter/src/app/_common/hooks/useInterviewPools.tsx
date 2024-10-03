import { api } from '@/trpc/client';

export const useInterviewPools = () => {
  const query = api.interview_pool.get_all.useQuery(undefined);
  return { ...query, data: query.data || [] };
};
