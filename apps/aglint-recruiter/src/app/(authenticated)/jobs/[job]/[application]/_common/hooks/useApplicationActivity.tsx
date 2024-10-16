import { useRouterPro } from '@/hooks/useRouterPro';
import type { ApplicationActivity } from '@/routers/application/activity';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useApplicationActivity = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = useApplicationActivityProcedure({ application_id });
  return { ...query, data: query.data!, application_id };
};

const useApplicationActivityProcedure = (
  input: ApplicationActivity['input'],
): ProcedureQuery<ApplicationActivity> =>
  api.application.application_activity.useQuery(input);
