import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'applicationRecieved_email_applicant'>['api_payload'],
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
    throw new Error('no data in Application'); // Re-throw the Supabase error for further handling
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
    'applicationRecieved_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'applicationRecieved_email_applicant'>['comp_email_placeholders'] =
    {
      '{{ candidateFirstName }}': first_name,
      '{{ jobTitle }}': job_title,
      '{{ companyName }}': company,
      '{{ supportLink }}': '',
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'applicationRecieved_email_applicant'>['react_email_placeholders'] =
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

// http://localhost:3100/api/application-received

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
