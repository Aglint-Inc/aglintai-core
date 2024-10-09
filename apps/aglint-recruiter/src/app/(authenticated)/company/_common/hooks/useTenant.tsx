import { api } from '@/trpc/client';
export const useTenant = () => {
  const utils = api.useUtils();
  const refetch = () => {
    utils.tenant.read.invalidate();
  };

  const query = api.tenant.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
  })[0];

  return { ...query, refetch };
};
export type TenantType = ReturnType<typeof useTenant>;
