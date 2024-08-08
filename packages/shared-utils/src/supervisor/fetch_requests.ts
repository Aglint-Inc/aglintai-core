import { SupabaseType } from "@aglint/shared-types";

export const fetchRequestsUser = async ({
  supabase,
  user_id,
  priority,
}: {
  supabase: SupabaseType;
  user_id: string;
  priority: "urgent" | "standard" | "all";
}) => {
  const query = supabase.from("request").select("*").eq("assignee_id", user_id);

  if (priority === "urgent" || priority === "standard") {
    query.eq("priority", priority);
  }
  return (await query.throwOnError()).data;
};
