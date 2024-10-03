import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationMeta = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = api.application.application_meta.useQuery({ application_id });

  return { ...query, application_id };
};
