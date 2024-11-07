/* eslint-disable no-console */
import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

import { getRequestId } from '../test.utils';

test('test case 1: Get random request notes', async () => {
  const caller1 = await caller();
  const randomRequestId = await getRequestId();

  const note = await caller1.requests.note.read({
    request_id: randomRequestId,
  });
  if (note) {
    console.info(note);
  } else {
    console.info('No request notes found for this request');
  }
  expect(!!note).toBeTruthy();
});
