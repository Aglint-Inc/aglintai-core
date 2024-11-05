/**
 * Integration test example for the `post` router
 */
import test from '@playwright/test';

import { caller } from './utils/createCaller';

test('add and get post', async () => {
  const caller1 = caller();

  const jobs = await caller1.jobs.job.read({
    id: 'd82160ac-8ee1-4291-bc3d-dcaa5d23a9c2',
  });

  // eslint-disable-next-line no-console
  console.log(jobs);
});
