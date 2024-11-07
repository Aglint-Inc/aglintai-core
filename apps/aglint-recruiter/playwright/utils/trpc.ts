/* eslint-disable no-console */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { type DatabaseTable } from '@aglint/shared-types';
import { test as base, type TestType } from '@playwright/test';
import { type User } from '@supabase/supabase-js';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { createCaller } from '@/server/api/root';
import { createPrivateClient, createPublicClient } from '@/server/db';

export type BaseDependencies = {
  password: string;
  email: string;
};

type PublicDependencies = {
  adminDb: ReturnType<typeof createPublicClient>;
};
type PublicWorkerDependecies = BaseDependencies & {
  cookies: ResponseCookies;
  api: ReturnType<typeof createCaller>;
};
export type PublicTestProcedure = TestProcedure<typeof publicTestProcedure>;
export const publicTestProcedure = base.extend<
  PublicDependencies,
  PublicWorkerDependecies
>({
  email: [process.env.TRPC_TEST_P1_EMAIL, { scope: 'worker', option: true }],
  password: [
    process.env.TRPC_TEST_P1_PASSWORD,
    { scope: 'worker', option: true },
  ],
  adminDb: async ({}, use) => await use(createPublicClient()),
  cookies: [
    async ({}, use) => {
      const cookies = new ResponseCookies(new Headers());
      await use(cookies);
    },
    { scope: 'worker' },
  ],
  api: [
    async ({ cookies }, use) => {
      await use(createCaller({ cookies }));
    },
    { scope: 'worker' },
  ],
});

type PrivateDependecies = {};
type PrivateWorkerDependencies = {
  db: ReturnType<typeof createPrivateClient>;
  user_id: User['id'];
  recruiter_id: DatabaseTable['recruiter']['id'];
  log: (typeof console)['log'];
};
export type PrivateTestProcedure = TestProcedure<typeof privateTestProcedure>;
export const privateTestProcedure = publicTestProcedure.extend<
  PrivateDependecies,
  PrivateWorkerDependencies
>({
  log: [
    async ({ email }, use, { parallelIndex }) => {
      const log = (...args: Parameters<PrivateWorkerDependencies['log']>) => {
        console.log(
          '\t\b\b\b\b\b',
          '\x1b[35m',
          `${parallelIndex}`,
          '\x1b[0m',
          '>',
          '\x1b[32m',
          `${email}`,
          '\x1b[0m',
          '>',
          '\x1b[33m',
          ...args,
        );
      };
      await use(log);
    },
    { scope: 'worker' },
  ],
  db: [
    async ({ cookies }, use) => await use(createPrivateClient(cookies)),
    { scope: 'worker' },
  ],
  user_id: [
    async ({ db, email, password, log }, use) => {
      log('Signing in');
      const { data, error } = await db.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error('Sign in failed');
      log('Signed in');
      await use(data.user.id);
      log('Signing out');
      await db.auth.signOut({ scope: 'local' });
      log('Signed out');
    },
    { scope: 'worker', auto: true },
  ],
  recruiter_id: [
    async ({ db, user_id }, use) => {
      const { data } = await db
        .from('recruiter_relation')
        .select('recruiter_id')
        .eq('user_id', user_id)
        .single()
        .throwOnError();
      if (!data) throw new Error('Recruiter relation not found');
      await use(data.recruiter_id);
    },
    { scope: 'worker' },
  ],
});

type TestProcedure<T> = T extends TestType<infer R, infer S> ? R & S : never;
