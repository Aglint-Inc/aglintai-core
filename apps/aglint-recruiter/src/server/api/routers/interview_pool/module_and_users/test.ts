import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get pool users', async ({ api }) => {
  const pools = await api.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const moduleUsers = await api.interview_pool.module_and_users({
        module_id: pools[i].id,
      });

      expect(moduleUsers).toHaveProperty('id');
      expect(moduleUsers && Array.isArray(moduleUsers.relations)).toBe(true);
    }
  }
});
