import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('job.read', async ({ api, log }) => {
  log('Start job.read');
  await api.jobs.read();
  log('End job.read');
});
