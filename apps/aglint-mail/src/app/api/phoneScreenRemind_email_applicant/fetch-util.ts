import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'phoneScreenRemind_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  if (!candidateJob) {
    throw new Error('candidate and jobs details are not available');
  }

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'phoneScreenRemind_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'phoneScreenRemind_email_applicant'>['comp_email_placeholders'] =
    {
      '{{ candidateFirstName }}': candidateJob.candidates.first_name,
      '{{ jobTitle }}': candidateJob.public_jobs.job_title,
      '{{ companyName }}': candidateJob.public_jobs.company,
      '{{ phoneScreeningLink }}': `${process.env.BASE_URL}/candidate-phone-screening?job_post_id=${candidateJob.public_jobs.job_title}&application_id=${req_body.application_id}`,
    };
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'phoneScreenRemind_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: candidateJob.candidates.email,
  };
}
