import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('read department', async ({ api, log }) => {
  log('Start department read');
  await api.tenant.departments();
  log('End department read');
});
