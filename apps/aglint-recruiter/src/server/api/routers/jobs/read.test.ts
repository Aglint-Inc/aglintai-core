import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure.describe.parallel(() => {
  privateTestProcedure('job.read', async ({ api, log }) => {
    log('Start job.read');
    await api.jobs.read();
    log('End job.read');
  });
});
