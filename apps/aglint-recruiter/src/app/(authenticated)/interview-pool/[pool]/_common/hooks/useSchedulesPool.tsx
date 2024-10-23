import { useParams } from 'next/navigation';

import type { SchedulesPool } from '@/routers/interview_pool/schedules';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const usePoolSchedules = ({
  filters,
}: {
  filters: string[];
}): ProcedureQuery<SchedulesPool> => {
  const params = useParams();
  const module_id = params?.pool as string;
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
