import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('update Locations', async ({ api, log }) => {
  log('Start update locations');

  const data = {
    city: 'update test city',
    country: 'update test country',
    is_headquarter: false,
    line1: 'update test line 1',
    line2: 'update test line 2',
    region: 'update test region',
    timezone: 'v test time zone',
    zipcode: 'update test zipcode',
    name: '',
  };

  await api.tenant.updateLocation({ ...data });

  log('End update locations');
});
