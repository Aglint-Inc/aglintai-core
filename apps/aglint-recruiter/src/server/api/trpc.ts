/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from '@trpc/server';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { createPrivateClient, createPublicClient } from '../db';
import { UNAUTHENTICATED, UNAUTHORIZED } from '../enums';
import { authorize } from '../utils';

type CreateContextOptions = {
  headers: Headers;
  cookies: ReadonlyRequestCookies;
};
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: CreateContextOptions) => {
  return opts;
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  // if (t._config.isDev) {
  //   const waitMs = Math.floor(Math.random() * 400) + 100;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await next();

  const end = Date.now();
  // eslint-disable-next-line no-console
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const authMiddleware = t.middleware(async ({ next, ctx, path }) => {
  const db = createPrivateClient({
    cookies: {
      getAll: () => ctx.cookies.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            ctx.cookies.set(name, value, options as unknown as ResponseCookie),
          );
        } catch {
          //
        }
      },
    },
  });

  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    throw new TRPCError({ code: 'FORBIDDEN', message: UNAUTHENTICATED });
  }

  const { data } = await db
    .from('recruiter_relation')
    .select(
      'recruiter_id, roles(name, role_permissions(permissions(name, is_enable)))',
    )
    .eq('user_id', user.id)
    .single()
    .throwOnError();

  if (!data) {
    throw new TRPCError({ code: 'FORBIDDEN', message: UNAUTHENTICATED });
  }

  const {
    recruiter_id,
    roles: { name: role, role_permissions },
  } = data;

  const permissions = role_permissions.reduce(
    (acc, { permissions: { is_enable, name } }) => {
      if (is_enable) acc.push(name);
      return acc;
    },
    [] as (typeof role_permissions)[number]['permissions']['name'][],
  );

  if (!authorize(path, permissions))
    throw new TRPCError({ code: 'UNAUTHORIZED', message: UNAUTHORIZED });

  return await next({
    ctx: {
      ...ctx,
      db,
      user,
      recruiter_id,
      role,
      permissions,
    },
  });
});

const adminClientMiddleware = t.middleware(async ({ ctx, next }) => {
  const db = createPublicClient();
  return await next({
    ctx: {
      ...ctx,
      db,
    },
  });
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure
  .use(timingMiddleware)
  .use(adminClientMiddleware);

/**
 * Private (authenticated) procedure
 *
 * This procedure is intended for queries and mutations that require the user to be authenticated.
 * It ensures that the user is logged in and authorized before accessing the API. User session data + permissions
 * are always accessible through the middleware chain, and you can safely assume the presence of an authenticated user.
 */
export const privateProcedure = t.procedure
  .use(timingMiddleware)
  .use(authMiddleware);
