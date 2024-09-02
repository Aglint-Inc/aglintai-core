import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';

export const GC_TIME = 5 * 60 * 1000;
export const STALE_TIME = 30 * 1000;
export const REFETCH_ON_MOUNT = false;
export const REFETCH_ON_WINDOW_FOCUS = false;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
        refetchOnMount: REFETCH_ON_MOUNT,
        refetchOnWindowFocus: REFETCH_ON_WINDOW_FOCUS,
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
