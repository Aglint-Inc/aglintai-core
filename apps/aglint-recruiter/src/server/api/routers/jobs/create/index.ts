import { createTRPCRouter } from '@/server/api/trpc';

import { aglint } from './aglint';
import { lever } from './lever';

export const create = createTRPCRouter({
  aglint,
  lever,
});
