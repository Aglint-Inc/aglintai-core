import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('workflows.read', async ({ api, log }) => {
  log('Start workflows.read');
  await api.workflows.read();
  log('End workflows.read');
});
