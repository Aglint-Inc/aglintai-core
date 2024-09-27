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

export const createQueryClient = (logout?: () => Promise<void>) => {
  let queryClient: QueryClient;
  queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, logout),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        onError(error as unknown as TRPCErrorShape<TRPCError>, logout),
      onSuccess: () => queryClient.invalidateQueries(),
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 10 * 1000,
        retry: 2,
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

const onError = async (
  error: TRPCErrorShape<TRPCError>,
  logout?: () => Promise<void>,
) => {
  if (!logout) return;
  if (error.data.code === ERRORS.UNAUTHORIZED.code) void (await logout());
};
