/* eslint-disable no-console */

import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get training progress', async () => {
  const caller1 = await caller();

  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const trainer_ids = pools[i].members.map(
        (member) => member.module_relation_id,
      );
      const progress = await caller1.interview_pool.training_progress({
        trainer_ids,
      });

      console.log(progress);
      expect(Array.isArray(progress)).toBe(true);
    }
  }
});
