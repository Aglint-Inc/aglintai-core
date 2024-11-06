/**
 * Integration test example for the `post` router
 */
import test from '@playwright/test';

import { caller } from './utils/createCaller';

test('add and get post', async () => {
  const caller1 = await caller();

  const jobs = await caller1.jobs.job.read({
    id: 'a37b59f9-29b7-4f73-830d-0f6f4ca2d683',
  });

  // eslint-disable-next-line no-console
  console.log(jobs);
});
