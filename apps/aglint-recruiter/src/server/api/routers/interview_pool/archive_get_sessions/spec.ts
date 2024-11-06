/* eslint-disable no-console */
import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get relations to check we can archive 1', async () => {
  const caller1 = await caller();
  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const rel = await caller1.interview_pool.archive_get_sessions({
        id: pools[i].id,
      });
      console.log(rel.errors);
      expect(rel).toHaveProperty('errors');
    }
  }
});
