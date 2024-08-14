import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

export async function dbUtil(
  req_body: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['api_payload'],
) {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule(id,applications(public_jobs(job_title,recruiter!public_jobs_recruiter_id_fkey(id,name,logo)),candidates(first_name,last_name,email)))',
      )
      .eq('id', req_body.filter_id),
  );
  if (filterJson.request_id) {
    await updateReminderInRequest(filterJson.request_id);
  }
  const [meetingDetails] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('interview_meeting(recruiter_user(*),status)')
      .eq('id', filterJson.session_ids[0]),
  );
  if (meetingDetails.interview_meeting.status !== 'waiting') {
    return null;
  }
  const meeting_organizer = meetingDetails.interview_meeting.recruiter_user;

  const {
    interview_schedule: {
      applications: {
        candidates: { email: cand_email, first_name, last_name },
        public_jobs: {
          job_title,
          recruiter: { name: companyName, id: recruiter_id, logo },
        },
      },
    },
  } = filterJson;

  const task_id = req_body.task_id;
  let scheduleLink = '';
  if (filterJson.interview_schedule.id && req_body.filter_id) {
    scheduleLink = task_id
      ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_id}&task_id=${task_id}`
      : `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_id}`;
  }
  const comp_email_placeholder: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: companyName,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      jobRole: job_title,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: meeting_organizer.scheduling_settings.timeZone.tzCode,
    };

  const react_email_placeholders: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      selfScheduleLink: scheduleLink,
    };

  return {
    company_id: recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}

const updateReminderInRequest = async (request_id: string) => {
  supabaseWrap(
    await supabaseAdmin.from('request_progress').insert({
      request_id,
      event_type: 'SELF_SCHEDULE_FIRST_FOLLOWUP',
      is_progress_step: false,
      status: 'completed',
    }),
  );
};
