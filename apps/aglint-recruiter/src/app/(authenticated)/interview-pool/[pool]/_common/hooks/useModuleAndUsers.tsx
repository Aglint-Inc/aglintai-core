import { useRouterPro } from '@/hooks/useRouterPro';
import type { InterviewPoolUsers } from '@/routers/interview_pool/module_and_users';
import { api } from '@/trpc/client';

type Output = { data: NonNullable<InterviewPoolUsers['output']> };

export const useModuleAndUsers = (): Output => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  const query = api.interview_pool.module_and_users.useSuspenseQuery({
    module_id: module_id,
  });
  return { data: query[0]! };
};
