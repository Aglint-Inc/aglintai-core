import { DatabaseTable, SupabaseType } from "@aglint/shared-types";

export const fetchRequestsUser = async ({
  supabase,
  user_id,
  priority,
  status,
}: {
  supabase: SupabaseType;
  user_id: string;
  priority: "urgent" | "standard" | "all";
  status: DatabaseTable["request"]["status"] | "all";
}) => {
  const query = supabase.from("request").select("*").eq("assignee_id", user_id);

  if (priority === "urgent" || priority === "standard") {
    query.eq("priority", priority);
  }
  if (status !== "all") {
    query.eq("status", status);
  }
  return (await query.throwOnError()).data;
};
