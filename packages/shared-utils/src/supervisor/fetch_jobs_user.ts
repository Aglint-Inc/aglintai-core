import { SupabaseType } from "@aglint/shared-types";

export const fetchJobsUser = async ({
  supabase,
  user_id,
  recruiter_id,
}: {
  supabase: SupabaseType;
  user_id: string;
  recruiter_id: string;
}) => {
  const query = supabase
    .from("public_jobs")
    .select("id,job_title")
    .eq("recruiter_id", recruiter_id)
    .or(
      `hiring_manager.eq.${user_id},recruiter.eq.${user_id},recruiting_coordinator.eq.${user_id},sourcer.eq.${user_id}`
    );

  return (await query.throwOnError()).data;
};
