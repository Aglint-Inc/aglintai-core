import { api } from '@/trpc/client';

export const useTenantOfficeLocations = () => {
  const query = api.tenant.officeLocations.useQuery(undefined, {
    staleTime: Infinity,
  });
  return {
    ...query,
    data: query.data! || [],
  };
};
