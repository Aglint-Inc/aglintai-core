import { jobsRouter } from './routers/jobs';
import { schedulingRouter } from './routers/scheduling/root';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  scheduling: schedulingRouter,
});

export type AppRouter = typeof appRouter;
