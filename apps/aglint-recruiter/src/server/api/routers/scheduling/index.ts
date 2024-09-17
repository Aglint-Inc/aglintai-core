import { createTRPCRouter } from '../../trpc';
import { schedulingAnalyticsRouter } from './analytics';
import { v1 } from './v1';

export const scheduling = createTRPCRouter({
  analytics: schedulingAnalyticsRouter,
  v1,
});
