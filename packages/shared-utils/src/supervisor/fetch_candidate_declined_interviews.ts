import { SupabaseType } from "@aglint/shared-types";

export const fetchCandidateDeclinedInterviews = async ({
  supabase,
  recruiter_id,
  user_id,
}: {
  supabase: SupabaseType;
  recruiter_id: string;
  user_id: string;
}) => {
  const query = supabase
    .from("interview_session_cancel")
    .select(
      "*,interview_session(id,name,schedule_type,interview_meeting(id,start_time,end_time,organizer_id,status)),interview_schedule(applications(candidates(first_name,last_name)))"
    )
    .not("schedule_id", "is", null)
    .eq("interview_session.interview_meeting.organizer_id", user_id)
    .eq("interview_session.interview_meeting.status", "confirmed")
    .not("interview_session.interview_meeting", "is", null)
    .not("interview_session", "is", null);

  return (await query.throwOnError()).data;
};
