import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { getFullName } from '@aglint/shared-utils';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'applicationRecieved_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name,last_name,scheduling_settings')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );
  const recruiter_tz = recruiter_user.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
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
      candidateFirstName: first_name,
      candidateLastName: last_name,
      jobRole: job_title,
      companyName: company,
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      candidateName: getFullName(first_name, last_name),
      recruiterFirstName: recruiter_user.first_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: recruiter_tz,
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
