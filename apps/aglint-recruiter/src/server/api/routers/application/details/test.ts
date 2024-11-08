import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get all details', async ({ api, adminDb, log }) => {
  log('Fetching details');
  const res = (await adminDb.from('applications').select('id').throwOnError())
    .data;
  if (!res || res?.length === 0) {
    log('No applications found');
    return;
  }
  const details = await api.application.application_details({
    application_id: res[0].id,
  });
  expect(Array.isArray(details)).toBe(true);
  log('Details fetched');
});
