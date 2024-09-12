import { createTRPCRouter } from '@/server/api/trpc';

import { jobs } from './jobs';
import { candidates } from './candidates';
import { schedules } from './schedules';
import { assignees } from './assignees';

export const create = createTRPCRouter({
  jobs,
  candidates,
  schedules,
  assignees,
});
