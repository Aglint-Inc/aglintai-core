import { createTRPCRouter } from '@/server/api/trpc';

import { hiring_team } from './hiring_team';
import { job_details } from './job_details';
import { profile_score } from './profile_score';

export const update = createTRPCRouter({
  hiring_team,
  job_details,
  profile_score,
});
