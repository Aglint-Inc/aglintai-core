import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'applicantReject_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );
  if (!candidateJob) {
    throw new Error('candidate and jobs details are not available');
  }
  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'applicantReject_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'applicantReject_email_applicant'>['comp_email_placeholders'] =
    {
      '{{ candidateFirstName }}': first_name,
      '{{ jobTitle }}': job_title,
      '{{ companyName }}': company,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'agent_email_candidate'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
