import { api } from '@/trpc/client';

export const useTenantRefetch = () => {
  const utils = api.useUtils();
  const refetch = () => utils.tenant.read.invalidate();
  return { refetch };
};
