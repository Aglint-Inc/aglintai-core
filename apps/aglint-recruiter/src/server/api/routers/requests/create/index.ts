import { createTRPCRouter } from '@/server/api/trpc';

import { jobs } from './jobs';
import { candidates } from './candidates';

export const create = createTRPCRouter({
  jobs,
  candidates,
});
