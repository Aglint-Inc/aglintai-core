import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get all interview pools with users', async ({ api }) => {
  const pools = await api.interview_pool.get_all();
  expect(Array.isArray(pools)).toBe(true);
});
