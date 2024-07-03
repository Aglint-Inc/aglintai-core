import type { EmailTemplateAPi } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function dbFetch(
  req_body: EmailTemplateAPi<'interviewStart_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );
  const [meeting] = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select()
      .eq('id', req_body.meeting_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,scheduling_settings')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );
  const recruiter_tz = recruiter_user.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'interviewStart_email_applicant',
  );

  const cand_tz = 'America/Los_angeles';

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      jobRole: job_title,
      candidateName: company,
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      startDate: dayjsLocal(meeting.start_time)
        .tz(cand_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: dayjsLocal(meeting.start_time)
        .tz(cand_tz)
        .format(DAYJS_FORMATS.END_TIME_FORMAT),
      endDate: dayjsLocal(meeting.end_time)
        .tz(cand_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      companyName: company,
      recruiterFirstName: recruiter_user.first_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: recruiter_tz,
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
