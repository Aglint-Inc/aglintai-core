import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useScheduleDetails = () => {
  const router = useRouterPro();
  const meeting_id = router.queryParams.meeting_id as string;
  const query = api.scheduling.details.useQuery({
    meeting_id,
  });

  return { ...query, data: query.data! };
};

export type ScheduleDetailsType = Awaited<
  ReturnType<typeof useScheduleDetails>
>['data'];
