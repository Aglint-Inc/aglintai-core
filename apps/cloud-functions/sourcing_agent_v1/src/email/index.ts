export const send_mails = async ({
  candidate_ids,
  types,
}: {
  candidate_ids: string[];
  types:
    | "Recruitment Inquiry"
    | "Networking Connection"
    | "Research Study Invitation";
}) => {
  return { status: { success: candidate_ids, failed: candidate_ids }, types };
};
