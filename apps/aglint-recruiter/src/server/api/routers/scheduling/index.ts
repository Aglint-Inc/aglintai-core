import { createTRPCRouter } from '../../trpc';
import { schedulingAnalyticsRouter } from './analytics';
import { scheduleDetails } from './details';
import { v1 } from './v1';

export const schedulingRouter = createTRPCRouter({
  analytics: schedulingAnalyticsRouter,
  v1,
  details: scheduleDetails,
});
