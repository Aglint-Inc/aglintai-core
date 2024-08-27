import type { EmailTemplateAPi, SupabaseType } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';

export const fetchUtil = async (
  supabaseAdmin: SupabaseType,
  req_body: EmailTemplateAPi<'applicantReject_email_applicant'>['api_payload'],
) => {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo,id,name)),public_jobs(id,job_title)',
      )
      .eq('id', req_body.application_id),
  );

  const {
    candidates: {
      email: cand_email,
      first_name,
      last_name,
      recruiter: { logo, name: companyName, id: recruiter_id },
    },
    public_jobs: { job_title },
  } = candidateJob;

  const comp_email_placeholder: EmailTemplateAPi<'applicantReject_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      companyName: companyName,
      jobRole: job_title,
    };

  const react_email_placeholders: EmailTemplateAPi<'agent_email_candidate'>['react_email_placeholders'] =
    {
      companyLogo: logo,
    };

  return {
    company_id: recruiter_id,
    job_id: candidateJob.public_jobs.id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: cand_email,
  };
};
