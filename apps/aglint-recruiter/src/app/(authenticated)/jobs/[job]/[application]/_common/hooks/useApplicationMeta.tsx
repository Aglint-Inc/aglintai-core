import { useRouterPro } from '@/hooks/useRouterPro';
import type { ApplicationMeta } from '@/routers/application/meta';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useApplicationMeta = (): ProcedureQuery<ApplicationMeta> => {
  const router = useRouterPro();
  const application_id = router.params.application;
  return api.application.application_meta.useQuery({ application_id });
};
