/* eslint-disable no-console */
import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

import { getRequestId } from '../test.utils';

test('test case 1: Get random request notes', async () => {
  const caller1 = await caller();
  const randomRequestId = await getRequestId();

  const sessions = await caller1.requests.utils.requestSessions({
    request_id: randomRequestId,
  });

  expect(!!sessions).toBeTruthy();
  if (sessions.length > 0) {
    console.info(sessions);
  } else {
    console.info('No request notes found for this request');
  }
});
