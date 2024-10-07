import { type SupabaseType } from '@aglint/shared-types';

export const getOrganizerId = async (
  application_id: string,
  supabase: SupabaseType,
) => {
  const app = (
    await supabase
      .from('applications')
      .select(
        'public_jobs!inner(recruiter,recruiting_coordinator,hiring_manager,sourcer,recruiter_id)',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data!;

  let organizer_id =
    app.public_jobs.recruiting_coordinator ||
    app.public_jobs.recruiter ||
    app.public_jobs.hiring_manager;

  if (!organizer_id) {
    const recRel = (
      await supabase
        .from('recruiter_relation')
        .select('*')
        .eq('recruiter_id', app.public_jobs.recruiter_id)
        .eq('role', 'admin')
        .single()
        .throwOnError()
    ).data!;

    organizer_id = recRel.user_id;
  }

  return organizer_id;
};
