import { createTRPCRouter } from '../../trpc';
import { schedulingAnalyticsRouter } from './analytics';

export const schedulingRouter = createTRPCRouter({
  analytics: schedulingAnalyticsRouter,
});
