import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationRequests = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application;
  const query = api.application.applicationRequest.useQuery({ application_id });
  const refetch = () =>
    utils.application.applicationRequest.invalidate({ application_id });
  return { ...query, refetch };
};
