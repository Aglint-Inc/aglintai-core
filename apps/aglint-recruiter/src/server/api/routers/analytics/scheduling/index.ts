import { createTRPCRouter } from '../../../trpc';
import { recentDecline } from './recentDecline';
import { recentDeclineReschedule } from './recentDeclineReschedule';
import { recentReschedule } from './recentReschedule';

export const scheduling = createTRPCRouter({
  recentDeclineReschedule,
  recentReschedule,
  recentDecline,
});
