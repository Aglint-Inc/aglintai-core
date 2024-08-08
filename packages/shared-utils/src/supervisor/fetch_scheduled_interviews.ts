import { SupabaseType } from "@aglint/shared-types";

export const fetchScheduledInterviews = async ({
  supabase,
  recruiter_id,
  time,
  type,
  user_id,
}: {
  supabase: SupabaseType;
  recruiter_id: string;
  time: "today" | "week";
  type: "upcoming" | "unconfirmed";
  user_id: string;
}) => {
  const query = supabase
    .from("meeting_details")
    .select(
      "id,session_name,session_id,start_time,end_time,schedule_type,meeting_interviewers!public_interview_session_meeting_id_fkey(session_relation_id,training_type,is_confirmed,first_name,last_name,email,profile_image,user_id,position,tz_code)"
    )
    .eq("recruiter_id", recruiter_id)
    .eq("organizer_id", user_id);

  if (type === "upcoming") {
    const today = new Date();
    query.eq("status", "confirmed");
    if (time === "today") {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      query.gte("start_time", startOfDay.toISOString());
      query.lte("start_time", endOfDay.toISOString());
    } else {
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      const endOfWeek = new Date(today);

      // Adjust startOfWeek to the previous Monday
      startOfWeek.setDate(
        today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
      );

      // Adjust endOfWeek to the upcoming Sunday
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      query.gte("start_time", startOfWeek.toISOString());
      query.lte("start_time", endOfWeek.toISOString());
    }
  } else {
    query.eq("status", "waiting");
  }

  return (await query.throwOnError()).data;
};
