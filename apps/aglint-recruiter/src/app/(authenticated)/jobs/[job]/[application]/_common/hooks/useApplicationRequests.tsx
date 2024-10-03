import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationRequests = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = api.application.application_request.useQuery({
    application_id,
  });
  return { ...query, data: query.data!, application_id };
};
