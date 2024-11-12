import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('Get requests count', async ({ api, log }) => {
  log('Start Get requests count');
  await api.requests.read.requestCount();
  log('End Get requests count');
});
