import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get all stages', async ({ api, adminDb, log }) => {
  log('fetching stages');
  const res = (await adminDb.from('applications').select('id').throwOnError())
    .data;
  if (!res || res?.length === 0) {
    log('No applications found');
    return;
  }
  const stages = await api.application.interview_stages({
    application_id: res[0].id,
  });
  expect(Array.isArray(stages)).toBe(true);
  log('stages fetched');
});
