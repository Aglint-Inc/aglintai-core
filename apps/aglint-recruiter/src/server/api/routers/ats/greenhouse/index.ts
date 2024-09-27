import { createTRPCRouter } from '@/server/api/trpc';

import { applications } from './applications';
import { departments } from './departments/departments';
import { fullSync } from './fullSync/fullSync';
import { get } from './get';
import { jobs } from './jobs/jobs';
import { officeLocations } from './office_locations/officeLocations';
import { post } from './post';
import { users } from './users/users';

export const greenhouse = createTRPCRouter({
  applications,
  departments,
  fullSync,
  jobs,
  officeLocations,
  users,
  get,
  post,
});

