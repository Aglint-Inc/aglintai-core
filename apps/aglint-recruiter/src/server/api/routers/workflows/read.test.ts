import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure.describe.parallel(() => {
  privateTestProcedure('workflows.read', async ({ api, log }) => {
    log('Start workflows.read');
    await api.workflows.read();
    log('End workflows.read');
  });
});
