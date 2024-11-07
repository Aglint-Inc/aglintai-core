import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get home page preview',
  async ({ api, log, db, recruiter_id }) => {
    log('Start get home page preview');

    const applications = await db
      .from('applications')
      .select('id')
      .eq('status', 'interview')
      .eq('recruiter_id', recruiter_id);

    const application_id = applications.data![0].id;

    await api.candidatePortal.get_home_page_preview({
      recruiter_id,
      application_id,
    });
    log('End get home page preview');
  },
);
