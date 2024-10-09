import { analytics } from './routers/analytics';
import { application } from './routers/application';
import { ats } from './routers/ats';
import { candidate_availability } from './routers/candidate_availability';
import { candidatePortal } from './routers/candidatePortal';
import { email } from './routers/email';
import { example, exampleSchema } from './routers/example';
import { utility } from './routers/external';
import { get_last_login } from './routers/get_last_login';
import { integrations } from './routers/integrations';
import { interview_pool } from './routers/interview_pool';
import { interviewers } from './routers/interviewers';
import { interviews } from './routers/interviews';
import { type Jobs, jobs } from './routers/jobs';
import { requests } from './routers/requests';
import { rolesAndPermissions } from './routers/rolesAndPermissions';
import { scheduling } from './routers/scheduling';
import { tenant } from './routers/tenant';
import { user } from './routers/user';
import { workflows } from './routers/workflows';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ats,
  tenant,
  analytics,
  candidatePortal,
  example,
  integrations,
  interviewers,
  interview_pool,
  jobs,
  requests,
  scheduling,
  application,
  workflows,
  get_last_login,
  user,
  rolesAndPermissions,
  candidate_availability,
  utility,
  email,
  interviews,
});

export type Api = {
  jobs: Jobs;
};

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
