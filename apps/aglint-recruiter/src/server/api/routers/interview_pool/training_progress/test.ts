/* eslint-disable no-console */

import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get training progress', async ({ api }) => {
  const pools = await api.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const trainer_ids = pools[i].members.map(
        (member) => member.module_relation_id,
      );
      const progress = await api.interview_pool.training_progress({
        trainer_ids,
      });

      expect(Array.isArray(progress)).toBe(true);
    }
  }
});
