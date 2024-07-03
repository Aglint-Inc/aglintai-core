import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchJobEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'applicationRecieved_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );

  const [organizer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name,last_name,scheduling_settings')
      .eq('user_id', req_body.organizer_id),
  );
  const recruiter_tz = organizer.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email: cand_email,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const comp_email_temp = await fetchJobEmailTemp(
    candidateJob.public_jobs.id,
    'applicationRecieved_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'applicationRecieved_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      jobRole: job_title,
      companyName: company,
      OrganizerName: getFullName(organizer.first_name, organizer.last_name),
      candidateName: getFullName(first_name, last_name),
      OrganizerFirstName: organizer.first_name,
      OrganizerLastName: organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
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
