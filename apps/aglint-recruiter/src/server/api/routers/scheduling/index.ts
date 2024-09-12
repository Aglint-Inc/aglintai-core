import { createTRPCRouter } from '../../trpc';
import { schedulingAnalyticsRouter } from './analytics';
import { v1 } from './v1';

export const schedulingRouter = createTRPCRouter({
  analytics: schedulingAnalyticsRouter,
  v1,
});
