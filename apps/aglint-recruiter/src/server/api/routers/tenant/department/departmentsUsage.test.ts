import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'Usage department',
  async ({ api, log, recruiter_id, db }) => {
    log('Start usage Department');
    const departments = (
      await db
        .from('departments')
        .select('id')
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
    ).data!;

    const department_id = departments.map((loc) => loc.id)[0];
    await api.tenant.departmentsUsage({ department_id });

    log('End usage Department');
  },
);
