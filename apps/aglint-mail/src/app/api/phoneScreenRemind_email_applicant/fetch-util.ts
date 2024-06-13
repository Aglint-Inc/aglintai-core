import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { getFullName } from '@aglint/shared-utils';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'phoneScreenRemind_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'phoneScreenRemind_email_applicant',
  );

  const phone_screen_link = `${process.env.NEXT_PUBLIC_APP_URL}/candidate-phone-screening?job_post_id=${candidateJob.public_jobs.job_title}&application_id=${req_body.application_id}`;
  const comp_email_placeholder: EmailTemplateAPi<'phoneScreenRemind_email_applicant'>['comp_email_placeholders'] =
    {
      '{{ candidateFirstName }}': candidateJob.candidates.first_name,
      '{{ jobTitle }}': candidateJob.public_jobs.job_title,
      '{{ companyName }}': candidateJob.public_jobs.company,
      '{{ phoneScreeningLink }}': `<a href="${phone_screen_link}">click here</a>`,
      '{{ recruiterFullName }}': getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
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
