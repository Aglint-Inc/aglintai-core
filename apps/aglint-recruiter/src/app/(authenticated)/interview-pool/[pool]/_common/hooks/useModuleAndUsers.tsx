import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useModuleAndUsers = () => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.module_and_users.useQuery({
    module_id: module_id,
  });
};
