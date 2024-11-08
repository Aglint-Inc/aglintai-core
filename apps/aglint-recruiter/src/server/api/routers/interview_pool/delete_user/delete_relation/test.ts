/* eslint-disable no-console */
import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'delete relation with relationid',
  async ({ api, log }) => {
    log('Starting');
    const pools = await api.interview_pool.get_all();

    if (pools && pools.length > 0) {
      const limit = Math.min(2, pools.length);

      for (let i = 0; i < limit; i++) {
        const poolRelationId = pools[i]?.members?.[0]?.module_relation_id;

        if (!poolRelationId) {
          console.log(
            `No poolRelationId found for pool with id ${pools[i].id}`,
          );
          continue;
        }
        const poolRelationDelete =
          await api.interview_pool.delete_user.delete_relation({
            relation_id: poolRelationId,
          });
        expect(poolRelationDelete).toBe(true);
      }
    }
    log('Ending');
  },
);
