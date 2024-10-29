import { createTRPCRouter } from '../../../trpc';
import { recentDecline } from './recentDecline';
import { recentDeclineReschedule } from './recentDeclineReschedule';
import { recentReschedule } from './recentReschedule';
import { trainingProgress } from './trainingProgress';

export const scheduling = createTRPCRouter({
  recentDeclineReschedule,
  recentReschedule,
  recentDecline,
  trainingProgress,
});
