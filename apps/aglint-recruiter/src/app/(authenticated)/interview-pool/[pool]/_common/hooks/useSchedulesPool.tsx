import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const usePoolSchedules = ({ filters }: { filters: string[] }) => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.schedules.useQuery({
    module_id: module_id,
    filter: filters,
  });
};
