import { createTRPCRouter } from '@/server/api/trpc';

import { jobs } from './jobs';
import { candidates } from './candidates';
import { schedules } from './schedules';

export const create = createTRPCRouter({
  jobs,
  candidates,
  schedules,
});
