import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { createCaller } from '@/server/api/root';
import { createPrivateClient } from '@/server/db';

export const caller = async () => {
  const cookies = new ResponseCookies(new Headers());
  const db = await createPrivateClient(cookies);
  await db.auth.signInWithPassword({
    email: process.env.E2E_TEST_EMAIL,
    password: process.env.E2E_TEST_PASSWORD,
  });

  return createCaller({ cookies });
};
