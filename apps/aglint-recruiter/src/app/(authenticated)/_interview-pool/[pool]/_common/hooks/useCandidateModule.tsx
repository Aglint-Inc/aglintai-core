
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const usePoolCandidates = () => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.candidates.useQuery({
    module_id: module_id,
  });
};
