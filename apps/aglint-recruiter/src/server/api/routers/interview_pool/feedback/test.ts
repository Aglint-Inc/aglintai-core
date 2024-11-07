import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get feedbacks', async ({ api }) => {
  const pools = await api.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const feedbacks = await api.interview_pool.feedbacks({
        module_id: pools[i].id,
      });

      expect(Array.isArray(feedbacks)).toBe(true);
    }
  }
});
