import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('list interview pools from view', async ({ api }) => {
  const pools = await api.interview_pool.list();
  expect(Array.isArray(pools)).toBe(true);
});
