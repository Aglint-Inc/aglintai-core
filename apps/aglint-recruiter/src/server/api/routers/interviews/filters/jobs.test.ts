import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('fetch jobs', async ({ api, log }) => {
  log('fetching jobs');
  const jobs = await api.interviews.filters.jobs();
  expect(Array.isArray(jobs)).toBe(true);
  log('fetched jobs');
});
