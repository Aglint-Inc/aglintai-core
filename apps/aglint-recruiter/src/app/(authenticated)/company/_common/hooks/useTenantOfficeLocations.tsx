import { api } from '@/trpc/client';

export const useTenantOfficeLocations = () => {
  const query = api.tenant.officeLocations.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10,
    placeholderData: [],
  });
  return {
    ...query,
    data: query.data!,
  };
};
