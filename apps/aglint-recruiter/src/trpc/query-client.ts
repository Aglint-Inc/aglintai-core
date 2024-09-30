/* eslint-disable prefer-const */
import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import {
  type TRPCError,
  type TRPCErrorShape,
} from '@trpc/server/unstable-core-do-not-import';
import superjson from 'superjson';

import { ERRORS } from '@/server/enums';

export const GC_TIME = 5 * 60 * 1000;
export const STALE_TIME = 5 * 1000;
export const REFETCH_ON_MOUNT = true;
export const REFETCH_ON_WINDOW_FOCUS = true;

export const createQueryClient = (
  // eslint-disable-next-line no-unused-vars
  logout?: (_queryClient: QueryClient) => Promise<void>,
) => {
  let queryClient: QueryClient;
  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, () => {
          logout(queryClient);
        }),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, () => {
          logout(queryClient);
        }),
      onSuccess: () => queryClient.invalidateQueries(),
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 10 * 1000,
        retry: 3,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
  return queryClient;
};

const onError = (error: TRPCErrorShape<TRPCError>, logout?: () => void) => {
  if (!logout) return;
  if ((error?.data?.code ?? null) === ERRORS.UNAUTHORIZED.code) void logout();
};
