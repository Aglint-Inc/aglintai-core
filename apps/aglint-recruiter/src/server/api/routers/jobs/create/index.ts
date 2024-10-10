import { createTRPCRouter } from '@/server/api/trpc';

import { type Aglint, aglint } from './aglint';
import { lever } from './lever';

export const create = createTRPCRouter({
  aglint,
  lever,
});

export type Create = {
  aglint: Aglint;
};
