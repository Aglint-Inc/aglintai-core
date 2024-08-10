import { getFullName } from '@aglint/shared-utils';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,recruiter_id,timezone,recruiter(logo,name)),public_jobs(job_title,recruiter_id)',
      )
      .eq('id', req_body.application_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(id,start_time,end_time,recruiter_user(first_name,last_name,email,scheduling_settings))',
      )
      .eq('id', req_body.session_id),
  );

  const [interviewer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('user_id', req_body.recruiter_user_id),
  );

  const public_jobs = candidateJob.public_jobs;
  const candidate = candidateJob.candidates;
  const organizer = recruiter_user.interview_meeting.recruiter_user;

  const comp_email_placeholder: EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>['comp_email_placeholders'] =
    {
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      OrganizerTimeZone: '',
      jobRole: public_jobs.job_title,
      companyName: candidate.recruiter.name,
      candidateName: getFullName(candidate.first_name, candidate.last_name),
      candidateFirstName: candidate.first_name,
      candidateLastName: candidate.last_name,
      interviewerName: getFullName(
        interviewer.first_name,
        interviewer.last_name,
      ),
      interviewerFirstName: interviewer.first_name,
      interviewerLastName: interviewer.last_name,
    };

  const feedLink = recruiter_user.interview_meeting.id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${recruiter_user.interview_meeting.id}&tab=feedback`
    : '';

  const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>['react_email_placeholders'] =
    {
      companyLogo: candidate.recruiter.logo,
      interviewFeedbackLink: feedLink,
    };

  return {
    company_id: candidateJob.candidates.recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: interviewer.email,
  };
}
