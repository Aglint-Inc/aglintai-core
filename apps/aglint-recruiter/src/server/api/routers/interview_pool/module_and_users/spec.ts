import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get pool users', async () => {
  const caller1 = await caller();
  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const moduleUsers = await caller1.interview_pool.module_and_users({
        module_id: pools[i].id,
      });

      expect(moduleUsers).toHaveProperty('id');
      expect(moduleUsers && Array.isArray(moduleUsers.relations)).toBe(true);
    }
  }
});
