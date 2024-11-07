import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get candidates', async ({ api }) => {
  const pools = await api.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const candidates = await api.interview_pool.candidates({
        module_id: pools[i].id,
      });

      expect(Array.isArray(candidates)).toBe(true);
    }
  }
});
