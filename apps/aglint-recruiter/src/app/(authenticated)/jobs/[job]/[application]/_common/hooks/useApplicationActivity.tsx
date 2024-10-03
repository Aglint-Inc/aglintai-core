import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationActivity = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = api.application.application_activity.useQuery({
    application_id,
  });

  return { ...query, data: query.data!, application_id };
};
