import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'update Locations',
  async ({ api, log, db, recruiter_id }) => {
    log('Start update locations');

    const locations = (
      await db
        .from('office_locations')
        .select('id')
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
    ).data!;

    const location_id = locations.map((loc) => loc.id)[0];

    const data = {
      city: 'update test city',
      country: 'update test country',
      is_headquarter: false,
      line1: 'update test line 1',
      line2: 'update test line 2',
      region: 'update test region',
      timezone: 'v test time zone',
      zipcode: 'update test zipcode',
      name: 'update test name',
      id: location_id,
    };

    await api.tenant.updateLocation({ ...data });

    log('End update locations');
  },
);
