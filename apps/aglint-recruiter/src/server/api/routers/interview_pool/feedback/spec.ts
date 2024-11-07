import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get feedbacks', async () => {
  const caller1 = await caller();

  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const feedbacks = await caller1.interview_pool.feedbacks({
        module_id: pools[i].id,
      });

      expect(Array.isArray(feedbacks)).toBe(true);
    }
  }
});
