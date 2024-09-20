import { SupabaseType } from "@aglint/shared-types";

export const fetchScheduledInterviews = async ({
  supabase,
  time,
  type,
  user_id,
}: {
  supabase: SupabaseType;
  time: "today" | "week" | "month" | "next_week" | "next_month";
  type: "upcoming" | "unconfirmed";
  user_id: string;
}) => {
  const query = supabase
    .from("interview_meeting")
    .select(
      "id,organizer_id,start_time,end_time,status,interview_session(id,name,schedule_type)"
    )
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
    } else if (time === "week") {
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
    } else if (time === "month") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      query.gte("start_time", startOfMonth.toISOString());
      query.lte("start_time", endOfMonth.toISOString());
    } else if (time === "next_month") {
      const startOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
      );
      const endOfNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0
      );

      query.gte("start_time", startOfNextMonth.toISOString());
      query.lte("start_time", endOfNextMonth.toISOString());
    } else if (time === "next_week") {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfNextWeek = new Date(today);
      const endOfNextWeek = new Date(today);

      // Adjust startOfNextWeek to the next Monday
      startOfNextWeek.setDate(
        today.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek)
      );

      // Adjust endOfNextWeek to the Sunday following the next Monday
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

      query.gte("start_time", startOfNextWeek.toISOString());
      query.lte("start_time", endOfNextWeek.toISOString());
    }
  } else {
    query.eq("status", "waiting");
  }

  return (await query.throwOnError()).data;
};
