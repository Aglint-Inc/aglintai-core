import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'delete Locations',
  async ({ api, log, recruiter_id, db }) => {
    log('Start delete locations');
    const locations = (
      await db
        .from('office_locations')
        .select('id')
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
    ).data!;

    const location_id = locations.map((loc) => loc.id)[0];
    await api.tenant.deleteLocation({ location_id });

    log('End delete locations');
  },
);
