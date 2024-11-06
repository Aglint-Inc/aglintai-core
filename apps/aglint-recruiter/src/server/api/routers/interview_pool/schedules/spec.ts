import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get schedules', async () => {
  const caller1 = await caller();
  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const schedules = await caller1.interview_pool.schedules({
        module_id: pools[i].id,
      });

      expect(Array.isArray(schedules)).toBe(true);
    }
  }
});
