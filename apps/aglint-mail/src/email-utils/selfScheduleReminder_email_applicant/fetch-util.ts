import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<
  'selfScheduleReminder_email_applicant'
> = async (supabaseAdmin, req_body) => {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications(public_jobs(job_title,recruiter!public_jobs_recruiter_id_fkey(id,name,logo)),candidates(first_name,last_name,email))',
      )
      .eq('id', req_body.filter_id),
  );

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
    applications: {
      candidates: { email: cand_email, first_name, last_name },
      public_jobs: {
        job_title,
        recruiter: { name: companyName, id: recruiter_id, logo },
      },
    },
  } = filterJson;

  const task_id = req_body.task_id;
  let scheduleLink = '';
  if (filterJson.application_id && req_body.filter_id) {
    scheduleLink = task_id
      ? `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/invite/${filterJson.application_id}?filter_id=${req_body.filter_id}&task_id=${task_id}`
      : `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/invite/${filterJson.application_id}?filter_id=${req_body.filter_id}`;
  }
  const comp_email_placeholder: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName,
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
    mail_data: {
      company_id: recruiter_id,
      application_id: filterJson.application_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: cand_email,
    },
    candidate_portal_payload: {
      application_id: filterJson.application_id,
      filter_id: req_body.filter_id,
      type: 'selfScheduleReminder_email_applicant',
    },
  };
};
