import { createTRPCRouter } from '@/server/api/trpc';

import { job } from './job';
import { jobs } from './jobs';

export const sync = createTRPCRouter({
  job,
  jobs,
});
