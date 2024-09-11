import { createTRPCRouter } from '@/server/api/trpc';

import { jobs } from './jobs';

export const create = createTRPCRouter({
  jobs,
});
