import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get email', async ({ api, log, db, recruiter_id }) => {
  log('Start get email');
  const applications = await db
    .from('applications')
    .select('id')
    .eq('status', 'interview')
    .eq('recruiter_id', recruiter_id);

  const application_id = applications.data![0].id;
  await api.candidatePortal.get_email({ application_id });
  log('End get email');
});
