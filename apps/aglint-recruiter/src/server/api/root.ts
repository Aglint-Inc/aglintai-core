import { analyticsRouter } from './routers/analytics';
import { applications } from './routers/applications';
import { ats } from './routers/ats';
import { candidatePortalRouter } from './routers/candidatePortal';
import { example, exampleSchema } from './routers/example';
import { interviewPool } from './routers/interview_pool';
import { interviewerRouter } from './routers/interviewers';
import { requests } from './routers/requests';
import { schedulingRouter } from './routers/scheduling';
import { textTransform } from './routers/textTransform';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ats,
  applications,
  scheduling: schedulingRouter,
  example,
  candidatePortal: candidatePortalRouter,
  analytics: analyticsRouter,
  textTransform,
  interviewers: interviewerRouter,
  interview_pool: interviewPool,
  requests,
});

export const appRouterSchema = {
  example: exampleSchema,
};

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
