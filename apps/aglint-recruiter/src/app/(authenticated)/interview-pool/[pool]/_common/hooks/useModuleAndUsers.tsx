import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useModuleAndUsers = () => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  const query = api.interview_pool.module_and_users.useSuspenseQuery({
    module_id: module_id,
  });
  return { data: query[0]! };
};
