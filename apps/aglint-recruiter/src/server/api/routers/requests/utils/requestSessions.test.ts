/* eslint-disable no-console */
import { expect } from '@playwright/test';
import { getRequestId } from 'playwright/utils/request.test.utils';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'test case 1: Get random request notes',
  async ({ api, db, user_id }) => {
    const randomRequestId = await getRequestId({
      db,
      user_id,
    });

    if (randomRequestId) {
      const sessions = await api.requests.utils.requestSessions({
        request_id: randomRequestId,
      });

      expect(!!sessions).toBeTruthy();
    }
  },
);
