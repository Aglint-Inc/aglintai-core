import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const usePrefetchTabs = () => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  api.interview_pool.schedules.usePrefetchQuery({
    module_id: module_id,
    filter: ['confirmed', 'completed', 'cancelled'],
  });
  api.interview_pool.candidates.usePrefetchQuery({
    module_id: module_id,
  });
  api.interview_pool.feedbacks.useQuery({
    module_id: module_id,
  });
};
