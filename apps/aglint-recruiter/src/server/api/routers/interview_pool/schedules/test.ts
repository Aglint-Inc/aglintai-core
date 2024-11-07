import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get schedules', async ({ api }) => {
  const pools = await api.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const schedules = await api.interview_pool.schedules({
        module_id: pools[i].id,
      });

      expect(Array.isArray(schedules)).toBe(true);
    }
  }
});
