import test from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test('Get requests count', async () => {
  const caller1 = await caller();
  const requests = await caller1.requests.read.requestCount();
  // eslint-disable-next-line no-console
  console.log(requests);
});
