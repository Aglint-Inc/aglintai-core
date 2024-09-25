import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

export const useAuth = () => {
  return api.auth.read.useSuspenseQuery(undefined, {
    staleTime: Infinity,
    trpc: TRPC_CLIENT_CONTEXT,
  })[0];
};
