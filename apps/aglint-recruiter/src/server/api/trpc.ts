/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import type { DatabaseTable } from '@aglint/shared-types';
import type { User } from '@supabase/supabase-js';
import { initTRPC, TRPCError } from '@trpc/server';
import type { ProcedureBuilder } from '@trpc/server/unstable-core-do-not-import';
import superjson from 'superjson';
import { type TypeOf, ZodError, type ZodSchema } from 'zod';

import { createPrivateClient, createPublicClient } from '../db';
import { authorize } from '../utils';
import { getDecryptKey } from './routers/ats/greenhouse/util';

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
export const createTRPCContext = async (opts: { headers: Headers }) => {
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
  //   const waitMs = Math.floor(Math.random() * 400) + 1000;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await next();

  const end = Date.now();
  if (process.env.NEXT_PUBLIC_HOST_NAME === 'http://localhost:3000') {
    // eslint-disable-next-line no-console
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  }
  return result;
});

const atsMiddleware = t.middleware(async ({ next, ctx, getRawInput }) => {
  const adminDb = createPublicClient();
  const input = await getRawInput();
  const recruiter_id = (input as any)
    .recruiter_id as DatabaseTable['recruiter']['id'];
  if (!recruiter_id)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Invalid payload',
    });
  const recruiter_preferences = (
    await adminDb
      .from('recruiter_preferences')
      .select('ats')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data;
  if (!recruiter_preferences)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'No preference found',
    });
  const { ats } = recruiter_preferences;
  if (ats === 'Aglint')
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Not supported',
    });
  let decryptKey: string;
  const integrations = (
    await adminDb
      .from('integrations')
      .select('greenhouse_key, greenhouse_metadata, lever_key, ashby_key')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data!;
  if (!integrations)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'No integrations found',
    });
  const { greenhouse_key, greenhouse_metadata, ashby_key, lever_key } =
    integrations;
  if (ats === 'Greenhouse') {
    if (!greenhouse_key)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Missing greenhouse key',
      });
    decryptKey = getDecryptKey(greenhouse_key);
  } else if (ats === 'Lever') {
    if (!lever_key)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Missing lever key',
      });
    decryptKey = getDecryptKey(lever_key);
  } else if (ats === 'Ashby') {
    if (!ashby_key)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Missing ashby key',
      });
    decryptKey = getDecryptKey(ashby_key);
  }
  return await next({
    ctx: {
      ...ctx,
      ats,
      greenhouse_metadata,
      decryptKey: decryptKey!,
    },
  });
});

/**
 *  @see https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
 */
const authMiddleware = t.middleware(async ({ next, ctx, path }) => {
  const db = createPrivateClient();

  let user: User | null = null;

  if (process.env.NODE_ENV === 'development')
    user = (await db.auth.getSession())?.data?.session?.user ?? null;
  else user = (await db.auth.getUser()).data.user;

  if (!user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User unauthenticated',
    });

  const user_id = user.id;

  const { data } = await db
    .from('recruiter_relation')
    .select(
      'recruiter_id,recruiter(primary_admin), roles!inner(name, role_permissions!inner(permissions!inner(name, is_enable)))',
    )
    .eq('user_id', user.id)
    .single()
    .throwOnError();
  data?.recruiter?.primary_admin;

  if (!data || !data?.roles?.role_permissions)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User unauthenticated',
    });

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
    throw new TRPCError({ code: 'FORBIDDEN', message: 'User unauthorized' });

  return await next({
    ctx: {
      ...ctx,
      user_id,
      recruiter_id,
      role,
      is_primary_admin: data.recruiter?.primary_admin === user_id,
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

export const publicProcedure = t.procedure.use(timingMiddleware);
export type PublicProcedure<T = unknown> = Procedure<typeof publicProcedure, T>;

export const atsProcedure = publicProcedure.use(atsMiddleware);
export type ATSProcedure<T = unknown> = Procedure<typeof atsProcedure, T>;

export const dbProcedure = publicProcedure;
export type DBProcedure<T = unknown> = Procedure<typeof dbProcedure, T>;

/**
 * Private (authenticated) procedure
 *
 * This procedure is intended for queries and mutations that require the user to be authenticated.
 * It ensures that the user is logged in and authorized before accessing the API. User session data + permissions
 * are always accessible through the middleware chain, and you can safely assume the presence of an authenticated user.
 */

export const privateProcedure = publicProcedure.use(authMiddleware);
export type PrivateProcedure<T = unknown> = Procedure<
  typeof privateProcedure,
  T
>;

type Procedure<
  U extends ProcedureBuilder<any, any, any, any, any, any, any, any>,
  T = unknown,
> = T extends ZodSchema
  ? U extends ProcedureBuilder<
      infer TContext,
      any,
      infer TContextOverrides,
      any,
      any,
      any,
      any,
      any
    >
    ? {
        ctx: TContext & TContextOverrides;
        input: TypeOf<T>;
      }
    : never
  : U extends ProcedureBuilder<
        infer TContext,
        any,
        infer TContextOverrides,
        any,
        any,
        any,
        any,
        any
      >
    ? {
        ctx: TContext & TContextOverrides;
        input: undefined;
      }
    : never;

export type RequiredPayload<T extends Record<any, any>[] | Record<any, any>> =
  T extends Record<any, any>[] ? Required<T[number]>[] : Required<T>;
