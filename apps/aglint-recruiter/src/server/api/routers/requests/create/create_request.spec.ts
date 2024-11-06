import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';
import { testData } from 'playwright/utils/testData/request';

import { type CreateRequest } from './create_request';

// TODO: Add more test cases
test('test case 1: Add new request', async () => {
  const caller1 = await caller();
  const { create_request } = await testData();

  const requests = await caller1.requests.create.create_request({
    ...create_request,
  });

  expect(requests satisfies CreateRequest['output']).toBeTruthy();

  // eslint-disable-next-line no-console
  console.info('Created request successfully');
});
