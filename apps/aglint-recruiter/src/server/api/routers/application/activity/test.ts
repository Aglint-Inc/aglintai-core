import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get all application activities',
  async ({ api, adminDb, log }) => {
    log('Fetching applications');
    const res = (await adminDb.from('applications').select('id').throwOnError())
      .data;
    if (!res || res?.length === 0) {
      log('No applications found');
      return;
    }
    const activities = await api.application.application_activity({
      application_id: res[0].id,
    });
    log(activities?.length + ' activities fetched');
    expect(Array.isArray(activities)).toBe(true);
    log('Activities fetched');
  },
);
