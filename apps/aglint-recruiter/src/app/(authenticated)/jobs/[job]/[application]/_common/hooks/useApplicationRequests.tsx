import { useRouterPro } from '@/hooks/useRouterPro';
import type { ApplicationRequest } from '@/routers/application/requests';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useApplicationRequests = () => {
  const router = useRouterPro();
  const application_id = router.params.application;
  const query = useApplicationRequestsProcedure({ application_id });
  return { ...query, data: query.data!, application_id };
};

const useApplicationRequestsProcedure = (
  input: ApplicationRequest['input'],
): ProcedureQuery<ApplicationRequest> =>
  api.application.application_request.useQuery(input);
