import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get meta', async ({ api, adminDb, log }) => {
  log('fetching meta');
  const res = (await adminDb.from('applications').select('id').throwOnError())
    .data;
  if (!res || res?.length === 0) {
    log('No applications found');
    return;
  }
  const meta = await api.application.application_meta({
    application_id: res[0].id,
  });
  log(meta?.email);
  expect(!!meta?.email).toBe(true);
  log('meta fetched');
});
