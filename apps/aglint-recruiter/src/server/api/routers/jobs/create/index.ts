import { createTRPCRouter } from '@/server/api/trpc';

import { aglint } from './aglint';

export const create = createTRPCRouter({
  aglint,
});
