import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useInterviewStages = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application as string;
  const query = api.application.interviewStages.useQuery({ application_id });
  const refetch = () =>
    utils.application.interviewStages.invalidate({ application_id });
  return { ...query, refetch };
};

export type StageWithSessions = ReturnType<typeof useInterviewStages>['data'];
