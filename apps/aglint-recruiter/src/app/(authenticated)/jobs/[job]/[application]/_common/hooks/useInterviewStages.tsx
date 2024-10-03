import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useInterviewStages = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application as string;
  const query = api.application.interview_stages.useQuery({ application_id });
  const refetch = () =>
    utils.application.interview_stages.invalidate({ application_id });
  return { ...query, data: query.data || [], refetch, application_id };
};

export type StageWithSessions = ReturnType<typeof useInterviewStages>['data'];
