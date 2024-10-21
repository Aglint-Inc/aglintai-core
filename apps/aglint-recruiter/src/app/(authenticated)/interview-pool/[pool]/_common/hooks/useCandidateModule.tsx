import { useRouterPro } from '@/hooks/useRouterPro';
import type { CandidatesModule } from '@/routers/interview_pool/candidates';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const usePoolCandidates = (): ProcedureQuery<CandidatesModule> => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.candidates.useQuery({
    module_id: module_id,
  });
};
