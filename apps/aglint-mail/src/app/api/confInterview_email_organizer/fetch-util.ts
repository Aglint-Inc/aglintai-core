import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
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
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

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

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,recruiter_id,timezone,recruiter(logo)),public_jobs(job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );
  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,scheduling_settings')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );

  const {
    candidates: {
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs,
  } = candidateJob;

  const org_tz = recruiter_user.scheduling_settings.timeZone.tzCode;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'confInterview_email_organizer',
  );

  return int_sessions.map((int_session) => {
    const comp_email_placeholder: EmailTemplateAPi<'confInterview_email_organizer'>['comp_email_placeholders'] =
      {
        candidateFirstName: first_name,
        candidateLastName: last_name,
        candidateName: getFullName(first_name, last_name),
        recruiterFirstName: recruiter_user.first_name,
        recruiterLastName: recruiter_user.last_name,
        recruiterName: getFullName(
          recruiter_user.first_name,
          recruiter_user.last_name,
        ),
        recruiterTimeZone: org_tz,
        companyName: public_jobs.company,
        jobRole: public_jobs.job_title,
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
            .tz(org_tz)
            .format(DAYJS_FORMATS.DATE_FORMAT),
          time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(org_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
          sessionType: int_session.name,
          platform: platformRemoveUnderscore(int_session.schedule_type),
          duration: durationCalculator(int_session.session_duration),
          sessionTypeIcon: sessionTypeIcon(int_session.session_type),
          meetingIcon: scheduleTypeIcon(int_session.schedule_type),
        },
        candidateDetails: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`,
      };
    return {
      filled_comp_template,
      react_email_placeholders,
      recipient_email: int_session.interview_meeting.recruiter_user.email,
    };
  });
}
