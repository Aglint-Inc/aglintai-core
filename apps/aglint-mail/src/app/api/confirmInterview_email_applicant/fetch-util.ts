import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/userTzDayjs';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('*,interview_meeting(*)')
      .in('id', req_body.session_ids),
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
      timezone,
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'confirmInterview_email_applicant',
  );
  const cand_tz = timezone ?? 'America/Los_Angeles';

  const meeting_details = int_sessions.map((int_session) => {
    return {
      date: dayjsLocal(int_session.interview_meeting.start_time)
        .tz(cand_tz)
        .format('ddd MMMM DD, YYYY'),
      time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(cand_tz).format('hh:mm A')} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(cand_tz).format('hh:mm A')}`,
      sessionType: int_session.name,
      platform: platformRemoveUnderscore(int_session.schedule_type),
      duration: durationCalculator(int_session.session_duration),
      sessionTypeIcon: sessionTypeIcon(int_session.session_type),
      meetingIcon: scheduleTypeIcon(int_session.schedule_type),
    };
  });

  const comp_email_placeholder: EmailTemplateAPi<'confirmInterview_email_applicant'>['comp_email_placeholders'] =
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
  const react_email_placeholders: EmailTemplateAPi<'confirmInterview_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      candidateLink: '',
      meetingDetails: meeting_details,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
