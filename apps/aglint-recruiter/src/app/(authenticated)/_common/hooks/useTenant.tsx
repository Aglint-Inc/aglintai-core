import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

export const useTenant = () => {
  return api.tenant.read.useSuspenseQuery(undefined, {
    trpc: TRPC_CLIENT_CONTEXT,
  })[0];
};
