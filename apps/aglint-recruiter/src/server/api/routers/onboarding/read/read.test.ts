import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('onboarding.read', async ({ api, log }) => {
  log('Start onboarding.read');
  await api.onboarding.getOnboard();
  log('End onboarding.read');
});
