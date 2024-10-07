import { api } from '@/trpc/client';

export const useUnArchivePool = () => {
  const query = api.interview_pool.update.useMutation();
  return query;
};
