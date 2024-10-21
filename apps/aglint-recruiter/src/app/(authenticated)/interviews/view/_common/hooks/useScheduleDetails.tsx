import { useRouterPro } from '@/hooks/useRouterPro';
import type { ScheduleDetails } from '@/routers/scheduling/details';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useScheduleDetails = () => {
  const query = useScheduleDetailsProcedure();

  return { ...query, data: query.data! };
};

const useScheduleDetailsProcedure = (): ProcedureQuery<ScheduleDetails> => {
  const router = useRouterPro();
  const meeting_id = router.queryParams.meeting_id as string;
  return api.scheduling.details.useQuery({
    meeting_id,
  });
};

export type ScheduleDetailsType = Awaited<
  ReturnType<typeof useScheduleDetails>
>['data'];
