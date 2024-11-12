import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get Locations', async ({ api, log, recruiter_id }) => {
  log('Start get locations');

  await api.tenant.locations();
  log('End get locations');
});
