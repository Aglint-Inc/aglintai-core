import type { GetAllInterviewPool } from '@/routers/interview_pool/get_all';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useInterviewPools = () => {
  const query = useInterviewPoolsProcedure();
  return { ...query, data: query.data || [] };
};

const useInterviewPoolsProcedure = (): ProcedureQuery<GetAllInterviewPool> =>
  api.interview_pool.get_all.useQuery();
