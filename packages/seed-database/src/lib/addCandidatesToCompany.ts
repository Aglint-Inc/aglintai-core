import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';
import { seed_candidates } from '../data/candidates';

export const addCandidatesToCompany = async ({
  companyDetails,
}: {
  companyDetails: DatabaseTable['recruiter'];
}) => {
  const supabaseAdmin = getSupabaseServer();

  const addCandidate = async (cand: (typeof seed_candidates)[0]) => {
    const candidate_detail = supabaseWrap(
      await supabaseAdmin
        .from('candidates')
        .insert({
          email: cand.email,
          avatar: cand.avatar,
          city: cand.city,
          country: cand.country,
          current_company: cand.current_company,
          current_job_title: cand.current_job_title,
          first_name: cand.first_name,
          last_name: cand.last_name,
          linkedin: cand.linkedin,
          phone: cand.phone,
          state: cand.state,
          recruiter_id: companyDetails.id,
        })
        .select()
        .single()
    );
    const candidate_file = supabaseWrap(
      await supabaseAdmin
        .from('candidate_files')
        .insert({
          candidate_id: candidate_detail.id,
          file_url: cand.file_url,
          resume_json: cand.resume_json,
          resume_text: cand.resume_text,
        })
        .select()
        .single()
    );
    return { candidate_file, candidate_detail };
  };
  let cands_details: Awaited<ReturnType<typeof addCandidate>>[] = [];
  for (const cand of seed_candidates) {
    const cand_details = await addCandidate(cand);
    cands_details.push(cand_details);
  }
  return cands_details;
};
