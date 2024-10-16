import type { Roles } from '@/routers/tenant/roles';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useTenantRoles = (): ProcedureQuery<Roles> =>
  api.tenant.roles.useQuery();
