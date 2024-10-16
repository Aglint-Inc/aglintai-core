import type { InterviewPools } from '@/routers/interview_pool/interview_types';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useAllInterviewModules = () => {
  const query = useProcedure();
  return { ...query, data: query.data! };
};

const useProcedure = (): ProcedureQuery<InterviewPools> =>
  api.interview_pool.list.useQuery();
