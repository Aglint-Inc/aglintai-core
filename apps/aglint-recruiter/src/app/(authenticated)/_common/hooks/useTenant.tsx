import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

export const useTenant = () => {
  return api.tenant.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    trpc: TRPC_CLIENT_CONTEXT,
  })[0];
};
