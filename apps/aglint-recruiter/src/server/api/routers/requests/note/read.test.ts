/* eslint-disable no-console */
import { expect } from '@playwright/test';
import { getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Get random request notes',
  async ({ api, db, user_id, log }) => {
    log('Start requests.note.read');
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });

    if (randomRequestId) {
      const note = await api.requests.note.read({
        request_id: randomRequestId,
      });
      expect(!!note).toBeTruthy();
    }
    log('End requests.note.read');
  },
);
