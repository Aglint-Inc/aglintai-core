import { createTRPCRouter } from '@/server/api/trpc';

import { assignees } from './assignees';
import { candidates } from './candidates';
import { create_request } from './create_request';
import { jobs } from './jobs';
import { schedules } from './schedules';

export const create = createTRPCRouter({
  jobs,
  candidates,
  schedules,
  assignees,
  create_request,
});
