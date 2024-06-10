import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

import { EmailTemplateAPi, MeetingDetailCardType } from '@aglint/shared-types';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'debrief_email_interviewer'>['api_payload'],
) {
  const [session] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
      )
      .eq('id', req_body.session_id),
  );

  if (!session) {
    throw new Error('session not available');
  }
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  if (!candidateJob) {
    throw new Error('candidate and job details are not available');
  }

  const { candidates, public_jobs } = candidateJob;

  const debrief_email_interviewers = supabaseWrap(
    await supabaseAdmin
      .from('debreif_meeting_interviewers')
      .select('email,first_name')
      .eq('session_id', req_body.session_id),
  );

  const {
    interview_meeting,
    name,
    schedule_type,
    session_duration,
    session_type,
  } = session;
  const meeting_detail: MeetingDetailCardType = {
    date: dayjs(interview_meeting.start_time).format('ddd MMMM DD, YYYY'),
    time: `${dayjs(interview_meeting.start_time).format('hh:mm A')} - ${dayjs(interview_meeting.end_time).format('hh:mm A')}`,
    sessionType: name,
    platform: platformRemoveUnderscore(session.schedule_type),
    duration: durationCalculator(session_duration),
    sessionTypeIcon: sessionTypeIcon(session_type),
    meetingIcon: scheduleTypeIcon(schedule_type),
  };

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'debrief_email_interviewer',
  );

  const interviewers_mail_data = debrief_email_interviewers.map((inter) => {
    const comp_email_placeholder: EmailTemplateAPi<'debrief_email_interviewer'>['comp_email_placeholders'] =
      {
        '{{ candidateFirstName }}': candidates.first_name,
        '{{ jobTitle }}': public_jobs.job_title,
        '{{ companyName }}': public_jobs.company,
        '{{ interviewerFirstName }}': inter.first_name,
      };

    const filled_comp_template = fillCompEmailTemplate(
      comp_email_placeholder,
      comp_email_temp,
    );

    const react_email_placeholders: EmailTemplateAPi<'debrief_email_interviewer'>['react_email_placeholders'] =
      {
        companyLogo: candidateJob.candidates.recruiter.logo,
        emailBody: filled_comp_template.body,
        subject: filled_comp_template.subject,
        meetingDetails: meeting_detail,
        candidateLink: '',
      };

    return {
      filled_comp_template,
      react_email_placeholders,
      recipient_email: inter.email,
    };
  });

  return {
    interviewers_mail_data,
  };
}
