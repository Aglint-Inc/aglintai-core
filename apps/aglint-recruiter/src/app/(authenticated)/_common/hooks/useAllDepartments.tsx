import { api } from '@/trpc/client';

export const useAllDepartments = () => {
  const query = api.tenant.all_departments.useQuery(undefined, {
    staleTime: Infinity,
  });

  return { ...query, data: query.data || [] };
};
