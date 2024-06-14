import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
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
import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );
  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );
  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('*,interview_meeting(*)')
      .in('id', req_body.session_ids),
  );
  let cand_link = '';
  if (req_body.availability_req_id) {
    cand_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${req_body.availability_req_id}`;
  } else {
    cand_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${req_body.schedule_id}?filter_id=${req_body.schedule_id}`;
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
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(cand_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(cand_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)} `,
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
      '{{ recruiterFullName }}': getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
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
      candidateLink: cand_link,
      meetingDetails: meeting_details,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
