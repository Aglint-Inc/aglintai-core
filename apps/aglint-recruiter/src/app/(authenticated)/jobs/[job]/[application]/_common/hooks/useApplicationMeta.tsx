import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationMeta = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application;
  const query = api.application.applicationMeta.useQuery({ application_id });
  const refetch = () =>
    utils.application.applicationMeta.invalidate({ application_id });
  return { ...query, refetch, application_id };
};
