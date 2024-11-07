import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get candidate portal details', async ({ api, log }) => {
  log('Start Portal details');
  await api.candidatePortal.get_candidate_portal_detail();
  log('End Portal details');
});
