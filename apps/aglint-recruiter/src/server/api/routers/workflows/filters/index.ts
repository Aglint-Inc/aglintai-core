import { createTRPCRouter } from '@/server/api/trpc';

import { jobs } from './jobs';

export const filters = createTRPCRouter({
  jobs,
});
