import { api } from '@/trpc/client';

export const useTenantOfficeLocations = () =>
  api.tenant.officeLocations.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10,
    placeholderData: [],
  });
