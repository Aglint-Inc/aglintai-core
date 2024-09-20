import { analytics } from './routers/analytics';
import { application } from './routers/application';
import { ats } from './routers/ats';
import { candidatePortal } from './routers/candidatePortal';
import { example, exampleSchema } from './routers/example';
import { interview_pool } from './routers/interview_pool';
import { interviewers } from './routers/interviewers';
import { jobs } from './routers/jobs';
import { requests } from './routers/requests';
import { scheduling } from './routers/scheduling';
import { textTransform } from './routers/textTransform';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ats,
  analytics,
  candidatePortal,
  example,
  interviewers,
  interview_pool,
  jobs,
  requests,
  scheduling,
  textTransform,
  application,
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
