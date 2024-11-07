import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get navbar preview',
  async ({ api, log, recruiter_id }) => {
    log('Start get navbar preview');

    await api.candidatePortal.get_navbar_preview({
      recruiter_id,
    });
    log('End get navbar preview');
  },
);
