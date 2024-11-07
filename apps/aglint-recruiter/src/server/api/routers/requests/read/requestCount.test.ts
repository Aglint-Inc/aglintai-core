import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('Get requests count', async ({ api }) => {
  const requests = await api.requests.read.requestCount();
  expect(!!requests).toBeTruthy();
  // eslint-disable-next-line no-console
  console.log(requests);
});
