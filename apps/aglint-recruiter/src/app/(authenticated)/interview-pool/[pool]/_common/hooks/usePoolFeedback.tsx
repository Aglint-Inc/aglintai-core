import { useRouterPro } from '@/hooks/useRouterPro';
import type { FeedbackPool } from '@/routers/interview_pool/feedback';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
export const usePoolFeedbacks = (): ProcedureQuery<FeedbackPool> => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.feedbacks.useQuery(
    {
      module_id: module_id,
    },
    {
      staleTime: Infinity,
    },
  );
};
