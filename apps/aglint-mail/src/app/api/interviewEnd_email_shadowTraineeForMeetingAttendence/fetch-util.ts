import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { numberToOrdinal } from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewEnd_email_shadowTraineeForMeetingAttendence'>['api_payload'],
) {
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select('user_id,recruiter_user(*),interview_module(*)')
      .eq('id', req_body.interview_module_relation_id),
  );

  const [interviewMeeting] = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select(
        'recruiter_user(first_name,last_name,scheduling_settings),interview_schedule(applications(candidates(first_name,last_name),public_jobs(id,company,job_title,logo,recruiter_id)))',
      )
      .eq('id', req_body.interview_meeting_id),
  );
  const [session] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('name')
      .eq('id', req_body.session_id),
  );

  const [shadow] = supabaseWrap(
    await supabaseAdmin
      .from('module_relations_view')
      .select('shadow_meeting_count')
      .eq('user_id', data.user_id),
  );

  const shadowCount = shadow.shadow_meeting_count;

  const { interview_module, recruiter_user: trainee } = data;

  const organizer = interviewMeeting.recruiter_user;
  const candidate = interviewMeeting.interview_schedule.applications.candidates;
  const job = interviewMeeting.interview_schedule.applications.public_jobs;

  const comp_email_temp = await fetchCompEmailTemp(
    job.recruiter_id,
    'interviewEnd_email_shadowTraineeForMeetingAttendence',
  );

  const comp_email_placeholder: EmailTemplateAPi<'interviewEnd_email_shadowTraineeForMeetingAttendence'>['comp_email_placeholders'] =
    {
      candidateFirstName: candidate.first_name,
      candidateLastName: candidate.last_name,
      candidateName: getFullName(candidate.first_name, candidate.last_name),
      traineeFirstName: trainee.first_name,
      traineeLastName: trainee.last_name,
      traineeName: getFullName(trainee.first_name, trainee.last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      organizerName: getFullName(trainee.first_name, trainee.last_name),
      OrganizerTimeZone: organizer.scheduling_settings.timeZone.tzCode,
      sessionName: session.name,
      interviewType: interview_module.name,
      companyName: job.company,
      jobRole: job.job_title,
      shadowCount: numberToOrdinal(shadowCount),
      shadowConfirmLink: `<a href="#' target="_blank">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_shadowTraineeForMeetingAttendence'>['react_email_placeholders'] =
    {
      companyLogo: job.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: trainee.email,
  };
}
