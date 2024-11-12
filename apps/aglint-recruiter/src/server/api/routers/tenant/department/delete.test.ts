import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'delete department ',
  async ({ api, log, recruiter_id, db }) => {
    log('Start delete Department');
    const departments = (
      await db
        .from('departments')
        .select('id')
        .eq('recruiter_id', recruiter_id)
        .throwOnError()
    ).data!;

    const department_id = departments.map((loc) => loc.id)[0];
    await api.tenant.deleteDepartment({ department_id });

    log('End delete Department');
  },
);
