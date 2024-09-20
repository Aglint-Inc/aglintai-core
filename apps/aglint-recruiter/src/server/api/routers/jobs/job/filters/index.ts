import { createTRPCRouter } from '@/server/api/trpc';

import { badges } from './badges';
import { locations } from './location';

export const filters = createTRPCRouter({
  badges,
  locations,
});
