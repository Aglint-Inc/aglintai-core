/* eslint-disable no-console */
import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get relations to check we can archive 1',
  async ({ api, log }) => {
    log('Starting');
    const pools = await api.interview_pool.get_all();
    if (pools && pools.length > 0) {
      const limit = Math.min(5, pools.length);

      for (let i = 0; i < limit; i++) {
        const rel = await api.interview_pool.archive_get_sessions({
          id: pools[i].id,
        });
        log(rel.errors, i);
        expect(rel).toHaveProperty('errors');
      }
    }
    log('Ending');
  },
);
