import { createTRPCRouter } from '@/server/api/trpc';

import { findReplacementInts } from './findReplacementInts';

export const v1 = createTRPCRouter({
  findReplacementInts,
});
