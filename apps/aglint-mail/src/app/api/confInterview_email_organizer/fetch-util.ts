import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

import { EmailTemplateAPi } from '@aglint/shared-types';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/userTzDayjs';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'confInterview_email_organizer'>['api_payload'],
) {
  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time, recruiter_user(first_name,email))',
      )
      .in('id', req_body.session_ids),
  );

  if (!int_sessions) {
    throw new Error('sessions are not available');
  }
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,recruiter_id,timezone,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  if (!candidateJob) {
    throw new Error('candidate and job details are not available');
  }

  const {
    candidates: {
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
  } = candidateJob;

  const cand_tz = candidateJob.candidates.timezone ?? 'America/Los_Angeles';

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'confInterview_email_organizer',
  );

  return int_sessions.map((int_session) => {
    const comp_email_placeholder: EmailTemplateAPi<'confInterview_email_organizer'>['comp_email_placeholders'] =
      {
        '{{ candidateFirstName }}': first_name,
        '{{ recruiterFirstName }}':
          int_session.interview_meeting.recruiter_user.first_name,
      };

    const filled_comp_template = fillCompEmailTemplate(
      comp_email_placeholder,
      comp_email_temp,
    );
    const react_email_placeholders: EmailTemplateAPi<'confInterview_email_organizer'>['react_email_placeholders'] =
      {
        companyLogo: logo,
        emailBody: filled_comp_template.body,
        subject: filled_comp_template.subject,
        meetingDetails: {
          date: dayjsLocal(int_session.interview_meeting.start_time)
            .tz(cand_tz)
            .format('ddd MMMM DD, YYYY'),
          time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(cand_tz).format('hh:mm A')} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(cand_tz).format('hh:mm A')}`,
          sessionType: int_session.name,
          platform: platformRemoveUnderscore(int_session.schedule_type),
          duration: durationCalculator(int_session.session_duration),
          sessionTypeIcon: sessionTypeIcon(int_session.session_type),
          meetingIcon: scheduleTypeIcon(int_session.schedule_type),
        },
        candidateDetails: '',
      };
    return {
      filled_comp_template,
      react_email_placeholders,
      recipient_email: int_session.interview_meeting.recruiter_user.email,
    };
  });
}
