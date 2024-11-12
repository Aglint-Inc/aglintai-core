import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('get Locations', async ({ api, log, recruiter_id }) => {
  log('Start get locations');

  const data = {
    city: 'test city',
    country: 'test country',
    is_headquarter: false,
    line1: 'test line 1',
    line2: 'test line 2',
    region: 'test region',
    timezone: 'test time zone',
    zipcode: 'test zipcode',
    name: '',
  };

  await api.tenant.insertLocation({ ...data });
  log('End get locations');
});
