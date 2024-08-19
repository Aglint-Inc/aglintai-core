import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { httpLink } from '@trpc/client/links/httpLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import superjson from 'superjson';

import type { AppRouter } from '../server/api/root';
import { createTRPCClient } from '@trpc/client';

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.context.skipBatch === true,
      true: httpLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson as any,
      }),
      false: httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson as any,
      }),
    }),
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
  ],
});
