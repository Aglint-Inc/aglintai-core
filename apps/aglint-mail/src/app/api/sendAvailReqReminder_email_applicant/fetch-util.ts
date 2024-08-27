import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export async function dbUtil(
  req_body: EmailTemplateAPi<'sendAvailReqReminder_email_applicant'>['api_payload'],
) {
  const [avail_req_data] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*,request_session_relation( interview_session(interview_meeting(recruiter_user(*),status)) ),applications(id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name)),public_jobs(job_title))',
      )
      .eq('id', req_body.avail_req_id),
  );

  if (avail_req_data.request_id) {
    await updateReminderInRequest(avail_req_data.request_id);
  }
  if (
    avail_req_data.request_session_relation[0].interview_session
      .interview_meeting.status !== 'waiting'
  ) {
    return null;
  }

  const meeting_organizer =
    avail_req_data.request_session_relation[0].interview_session
      .interview_meeting.recruiter_user;
  const recruiter_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;
  if (!avail_req_data || !meeting_organizer) {
    throw new Error('Record not found');
  }

  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = avail_req_data.applications;

  const candidate_link = req_body.avail_req_id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${req_body.avail_req_id}`
    : '';

  const comp_email_placeholder: EmailTemplateAPi<'sendAvailReqReminder_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: companyName,
      jobRole: job_title,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
    };

  const react_email_placeholders: EmailTemplateAPi<'sendAvailReqReminder_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      availabilityReqLink: candidate_link,
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
      event_type: 'REQ_AVAIL_FIRST_FOLLOWUP',
      is_progress_step: false,
      status: 'completed',
    }),
  );
};
