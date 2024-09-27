import { api } from '@/trpc/client';

export const useDepartmentsUsage = api.tenant.departmentsUsage.useQuery;
