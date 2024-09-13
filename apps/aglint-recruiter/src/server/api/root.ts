import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { candidatePortalRouter } from './routers/candidatePortal';
import { example, exampleSchema } from './routers/example';
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
  scheduling: schedulingRouter,
  example,
  candidatePortal: candidatePortalRouter,
  textTransform,
  requests,
});

export const appRouterSchema = {
  example: exampleSchema,
};

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type Unvoid<T> = T extends void ? never : T;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
