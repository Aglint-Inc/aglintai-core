import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationActivity = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application;
  const query = api.application.applicationActivity.useQuery({
    application_id,
  });
  const refetch = () =>
    utils.application.applicationActivity.invalidate({ application_id });
  return { ...query, refetch };
};
