import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get all interview pools with users', async () => {
  const caller1 = await caller();

  const pools = await caller1.interview_pool.get_all();

  expect(Array.isArray(pools)).toBe(true);
});
