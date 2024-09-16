import { createTRPCRouter } from '@/server/api/trpc';

import { applications } from './applications';
import { departments } from './departments';
import { fullSync } from './fullSync';
import { jobs } from './jobs';
import { officeLocations } from './officeLocations';
import { users } from './users';

export const greenhouse = createTRPCRouter({
  applications,
  departments,
  fullSync,
  jobs,
  officeLocations,
  users,
});
