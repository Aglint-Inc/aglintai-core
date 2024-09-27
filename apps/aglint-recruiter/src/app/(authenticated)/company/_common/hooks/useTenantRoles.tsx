import { api } from '@/trpc/client';

export const useTenantRoles = () => {
  return api.tenant.roles.useQuery();
};
