import { useRouterPro } from '@/hooks/useRouterPro';
import type { ApplicationDetails as ApplicationDetailsAPI } from '@/routers/application/details';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useApplicationDetails = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = useApplicationDetailsProcedure({ application_id });
  return { ...query, data: query.data!, application_id };
};

const useApplicationDetailsProcedure = (
  input: ApplicationDetailsAPI['input'],
): ProcedureQuery<ApplicationDetailsAPI> =>
  api.application.application_activity.useQuery(input);

export type ApplicationDetails = ReturnType<
  typeof useApplicationDetails
>['data'];
