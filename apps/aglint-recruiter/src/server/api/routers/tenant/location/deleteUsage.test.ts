import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'get Locations',
  async ({ api, log, db, recruiter_id }) => {
    log('Start locations usage');

    const locations = (
      await db
        .from('office_locations')
        .select('id')
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
    ).data!;

    const location_id = locations.map((loc) => loc.id)[0];

    await api.tenant.locationUsage({ location_id });
    log('End locations usage');
  },
);
