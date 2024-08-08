import { SupabaseType } from "@aglint/shared-types";

export const fetchJobHiringTeam = async ({
  supabase,
  job_id,
  job_title,
  recruiter_id,
}: {
  supabase: SupabaseType;
  job_id?: string;
  job_title?: string;
  recruiter_id: string;
}) => {
  const userQuery = `user_id,first_name,last_name,profile_image,position`;
  const query = supabase
    .from("public_jobs")
    .select(
      `id,job_title,hir_man:recruiter_user!public_jobs_hiring_manager_fkey(${userQuery}),rec:recruiter_user!public_jobs_recruiter_fkey(${userQuery}),recruiting_coordinator:recruiter_user!public_jobs_recruiting_coordinator_fkey(${userQuery}),sourcer:recruiter_user!public_jobs_sourcer_fkey(${userQuery})`
    )
    .eq("recruiter_id", recruiter_id);

  if (job_id) {
    query.eq("id", job_id);
  } else if (job_title) {
    query.ilike("job_title", `%${job_title}%`);
  }

  return (await query.throwOnError()).data[0];
};
