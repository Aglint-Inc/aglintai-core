import { SupabaseType } from "@aglint/shared-types";

export const fetchInterviewTypes = async ({
  supabase,
  recruiter_id,
}: {
  supabase: SupabaseType;
  recruiter_id: string;
}) => {
  return (
    await supabase
      .from("interview_module")
      .select("id,name")
      .eq("recruiter_id", recruiter_id)
      .throwOnError()
  ).data;
};
