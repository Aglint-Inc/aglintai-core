import { createTRPCRouter } from '@/server/api/trpc';

import { location_count } from './locations_count';

export const job = createTRPCRouter({
  location_count,
});
