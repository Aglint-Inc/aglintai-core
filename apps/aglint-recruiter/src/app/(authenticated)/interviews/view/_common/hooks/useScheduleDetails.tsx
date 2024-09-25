import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useScheduleDetails = () => {
  const utils = api.useUtils();
  const router = useRouterPro();
  const meeting_id = router.queryParams.meeting_id as string;
  const query = api.scheduling.details.useQuery({
    meeting_id,
  });
  const refetch = () => {
    utils.scheduling.details.invalidate({
      meeting_id,
    });
  };
  return { ...query, refetch };
};

export type ScheduleDetailsType = Awaited<
  ReturnType<typeof useScheduleDetails>
>['data'];
