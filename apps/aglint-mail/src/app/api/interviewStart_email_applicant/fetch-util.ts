import { DatabaseEnums, EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/userTzDayjs';

export async function dbFetch(
  req_body: EmailTemplateAPi<'interviewStart_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );
  const [meeting] = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select()
      .eq('id', req_body.meeting_id),
  );

  if (!candidateJob || !meeting) {
    throw new Error('candidate and jobs details are not available');
  }

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'interviewStart_email_applicant',
  );

  const cand_tz = candidateJob.candidates.timezone ?? 'America/Los_angeles';

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_applicant'>['comp_email_placeholders'] =
    {
      '{{ candidateName }}': first_name,
      '{{ jobTitle }}': job_title,
      '{{ companyName }}': company,
      '{{ candidateLink }}': '',
      '{{ date }}': dayjsLocal(meeting.start_time)
        .tz(cand_tz)
        .format('MMMM dddd YYYY'),
      '{{ time }}':
        dayjsLocal(meeting.start_time).tz(cand_tz).format('hh:mm') +
        ` (${cand_tz})`,
    };
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: email,
  };
}
