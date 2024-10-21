import type { AllDepartments } from '@/routers/tenant/departments';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useAllDepartments = () => {
  const query = useProcedure();
  return { ...query, data: query.data ?? [] };
};

const useProcedure = (): ProcedureQuery<AllDepartments> =>
  api.tenant.all_departments.useQuery(undefined, {
    staleTime: Infinity,
  });
