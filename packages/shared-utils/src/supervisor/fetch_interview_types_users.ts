import { SupabaseType } from "@aglint/shared-types";

export const fetchInterviewTypeUsers = async ({
  supabase,
  recruiter_id,
  name,
}: {
  supabase: SupabaseType;
  recruiter_id: string;
  name: string;
}) => {
  return (
    await supabase
      .from("module_relations_view")
      .select("*,interview_module(recruiter_id)")
      .eq("interview_module.recruiter_id", recruiter_id)
      .ilike("module_name", `%${name}%`)
  ).data;
};
