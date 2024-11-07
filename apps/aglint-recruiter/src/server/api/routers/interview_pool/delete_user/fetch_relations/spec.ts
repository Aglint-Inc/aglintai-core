/* eslint-disable no-console */
import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('get user relation to other tables', async () => {
  const caller1 = await caller();
  const pools = await caller1.interview_pool.get_all();

  if (pools && pools.length > 0) {
    const limit = Math.min(5, pools.length);

    for (let i = 0; i < limit; i++) {
      const userId = pools[i]?.members?.[0]?.user_id;

      console.log(`userId: ${userId}`);

      if (userId) {
        const userRelation =
          await caller1.interview_pool.delete_user.fetch_relations({
            module_id: pools[i].id,
            selected_user_id: userId,
          });
        console.log(userRelation);
        expect(userRelation).toHaveProperty('isOngoingSchedules');
        expect(typeof userRelation.isOngoingSchedules).toBe('boolean');
      } else {
        console.log(`No user_id found for pool with id ${pools[i].id}`);
      }
    }
  }
});
