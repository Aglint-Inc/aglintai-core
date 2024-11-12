import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('Usage department', async ({ api, log }) => {
  log('Start department insert');

  await api.tenant.insertDepartment({ name: 'test department insert' });

  log('End department insert');
});
