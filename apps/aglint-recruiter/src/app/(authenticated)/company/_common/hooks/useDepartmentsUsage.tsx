import type { DepartmentsUsage } from '@/routers/tenant/departmentsUsage';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useDepartmentsUsage = (
  input: DepartmentsUsage['input'],
): ProcedureQuery<DepartmentsUsage> =>
  api.tenant.departmentsUsage.useQuery(input);
