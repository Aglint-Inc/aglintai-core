import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get Locations', async ({ api, log }) => {
  log('Start get locations');

  await api.tenant.locations();
  log('End get locations');
});
