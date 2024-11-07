import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('list interview pools from view', async () => {
  const caller1 = await caller();

  const pools = await caller1.interview_pool.list();

  expect(Array.isArray(pools)).toBe(true);
});
