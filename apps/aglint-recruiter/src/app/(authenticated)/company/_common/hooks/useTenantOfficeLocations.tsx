import type { OfficeLocations } from '@/routers/tenant/officeLocations';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useTenantOfficeLocations = () => {
  const query = useProcedure();
  return {
    ...query,
    data: query.data! || [],
  };
};

const useProcedure = (): ProcedureQuery<OfficeLocations> =>
  api.tenant.officeLocations.useQuery(undefined, {
    staleTime: Infinity,
  });
