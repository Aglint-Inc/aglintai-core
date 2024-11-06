import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';
import { getApplicationIds } from '../test.utils';

test('test case 1: All completed requests', async () => {
  const caller1 = await caller();

  const requests = await caller1.requests.read.completedRequest({});
  expect(!!requests).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(requests);
});
test('test case 1: Completed request filter with applications', async () => {
  const caller1 = await caller();
  const application_ids = await getApplicationIds({
    count: 2,
  });
  const requests = await caller1.requests.read.completedRequest({
    applications: application_ids,
  });
  expect(!!requests).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(requests, application_ids);
});

test('test case 2: Completed request filter with request types', async () => {
  const caller1 = await caller();
  const requests = await caller1.requests.read.completedRequest({
    type: ['schedule_request'],
  });
  // eslint-disable-next-line no-console
  console.log(requests);
});
