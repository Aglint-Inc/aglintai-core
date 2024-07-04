import { SupabaseType } from "@aglint/shared-types";

export const getOrganizerId = async (
  application_id: string,
  supabase: SupabaseType,
) => {
  const { data: app, error: errApp } = await supabase
    .from('applications')
    .select(
      'public_jobs(interview_coordinator,recruiter,recruiting_coordinator,hiring_manager,sourcer,recruiter_id)',
    )
    .eq('id', application_id)
    .single();

  if (errApp) throw new Error(errApp.message);

  let organizer_id =
    app.public_jobs.recruiting_coordinator ||
    app.public_jobs.interview_coordinator ||
    app.public_jobs.hiring_manager ||
    app.public_jobs.recruiter;

  if (!organizer_id) {
    const { data: recRel, error: errRecRel } = await supabase
      .from('recruiter_relation')
      .select('*')
      .eq('recruiter_id', app.public_jobs.recruiter_id)
      .eq('role', 'admin')
      .single();

    if (errRecRel) throw new Error(errRecRel.message);

    organizer_id = recRel.user_id;
  }

  return organizer_id;
};
