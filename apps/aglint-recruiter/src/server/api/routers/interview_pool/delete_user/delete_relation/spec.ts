/* eslint-disable no-console */
import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('delete relation with relationid', async () => {
  const caller1 = await caller();
  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(2, pools.length);

    for (let i = 0; i < limit; i++) {
      const poolRelationId = pools[i]?.members?.[0]?.module_relation_id;

      if (!poolRelationId) {
        console.log(`No poolRelationId found for pool with id ${pools[i].id}`);
        continue;
      }
      const poolRelationDelete =
        await caller1.interview_pool.delete_user.delete_relation({
          relation_id: poolRelationId,
        });
      console.log(poolRelationId, poolRelationDelete);
      expect(poolRelationDelete).toBe(true);
    }
  }
});
