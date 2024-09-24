import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useApplicationDetails = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application;
  const query = api.application.applicationDetails.useQuery({ application_id });
  const data = query.data!;
  const refetch = () =>
    utils.application.applicationDetails.invalidate({ application_id });
  return { ...query, data, refetch, application_id };
};

export type ApplicationDetails = ReturnType<
  typeof useApplicationDetails
>['data'];
