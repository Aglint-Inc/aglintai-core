import { useRouterPro } from '@/hooks/useRouterPro';
import type { SchedulesPool } from '@/routers/interview_pool/schedules';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const usePoolSchedules = ({
  filters,
}: {
  filters: string[];
}): ProcedureQuery<SchedulesPool> => {
  const router = useRouterPro();
  const module_id = router.params.pool;
  return api.interview_pool.schedules.useQuery(
    {
      module_id: module_id,
      filter: filters,
    },
    {
      staleTime: Infinity,
    },
  );
};
