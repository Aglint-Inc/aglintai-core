/* eslint-disable no-console */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { type DatabaseTable } from '@aglint/shared-types';
import { test as base, type TestType } from '@playwright/test';
import { type User } from '@supabase/supabase-js';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { createCaller } from '@/server/api/root';
import { createPrivateClient, createPublicClient } from '@/server/db';

type PublicDependencies = {
  adminDb: ReturnType<typeof createPublicClient>;
};
type PublicWorkerDependecies = {
  cookies: ResponseCookies;
  api: ReturnType<typeof createCaller>;
};
export type PublicTestProcedure = TestProcedure<typeof publicTestProcedure>;
export const publicTestProcedure = base.extend<
  PublicDependencies,
  PublicWorkerDependecies
>({
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
  db: [
    async ({ cookies }, use) => await use(createPrivateClient(cookies)),
    { scope: 'worker' },
  ],
  user_id: [
    async ({ db }, use, { workerIndex }) => {
      console.log(`Signing in WORKER=${workerIndex}`);
      const { data, error } = await db.auth.signInWithPassword(
        emailAndPassword(workerIndex),
      );
      if (error) throw new Error('Sign in failed');
      console.log(`Signed in WORKER=${workerIndex} USER=${data.user.id}`);
      await use(data.user.id);
    },
    { scope: 'worker' },
  ],
  log: [
    async ({ user_id }, use, { workerIndex }) => {
      const log = (...args: Parameters<PrivateWorkerDependencies['log']>) => {
        console.log(...args, `WORKER=${workerIndex}`, `USER=${user_id}`);
      };
      await use(log);
    },
    { scope: 'worker' },
  ],
  api: [
    async ({ cookies, user_id: _ }, use) => {
      await use(createCaller({ cookies }));
    },
    { scope: 'worker' },
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

privateTestProcedure.describe.configure({ mode: 'parallel' });

privateTestProcedure.afterAll('Sign-out', async ({ db, log }) => {
  log('Signing out');
  await db.auth.signOut({ scope: 'global' });
  log('Signed out');
});

type Response = { email: string; password: string };
const emailAndPassword = (workerIndex: number): Response => {
  switch (workerIndex % 2) {
    case 1:
      return {
        email: process.env.E2E_TEST_EMAIL_1,
        password: process.env.E2E_TEST_PASSWORD_1,
      };
    default:
      return {
        email: process.env.E2E_TEST_EMAIL_0,
        password: process.env.E2E_TEST_PASSWORD_0,
      };
  }
};

type TestProcedure<T> = T extends TestType<infer R, infer S> ? R & S : never;
