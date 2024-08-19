import { jobsRouter } from './routers/jobs';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
});

export type AppRouter = typeof appRouter;
