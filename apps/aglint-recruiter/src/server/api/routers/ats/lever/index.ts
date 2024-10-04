import { createTRPCRouter } from '@/server/api/trpc';

import { createLeverJob } from './create_job';
import { job } from './job';
import { jobs } from './jobs';

export const lever = createTRPCRouter({
  job,
  jobs,
  create_job: createLeverJob,
});
