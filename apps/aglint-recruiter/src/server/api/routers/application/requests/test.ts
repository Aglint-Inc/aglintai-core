import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get requests', async ({ api, adminDb, log }) => {
  log('fetching requests');
  const res = (await adminDb.from('applications').select('id').throwOnError())
    .data;
  if (!res || res?.length === 0) {
    log('No applications found');
    return;
  }
  const requests = await api.application.application_request({
    application_id: res[0].id,
  });
  expect(Array.isArray(requests)).toBe(true);
  log('requests fetched');
});
