import { api } from '@/trpc/client';
export const useTenant = () => {
  return api.tenant.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
  })[0];
};
export type TenantType = ReturnType<typeof useTenant>;
