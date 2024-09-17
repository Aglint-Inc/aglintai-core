import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';
export const usePoolFeedbacks = () => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.feedbacks.useQuery({
    module_id: module_id,
  });
};
