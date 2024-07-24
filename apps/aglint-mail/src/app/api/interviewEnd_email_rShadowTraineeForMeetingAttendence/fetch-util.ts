import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { numberToOrdinal } from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewEnd_email_rShadowTraineeForMeetingAttendence'>['api_payload'],
) {
  const training_ints = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('training_type', 'reverse_shadow')
      .eq('session_id', req_body.session_id),
    false,
  );

  if (training_ints.length === 0) {
    return [];
  }
  const [meeting_detail] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_module(*), interview_meeting(*, recruiter_user(*), interview_schedule(*, applications(*, public_jobs(*),candidates(*))))',
      )
      .eq('id', req_body.session_id),
  );

  const module_relations = supabaseWrap(
    await supabaseAdmin
      .from('module_relations_view')
      .select()
      .in(
        'user_id',
        training_ints.map((int) => int.user_id),
      ),
    false,
  );

  const comp_email_temp = await fetchCompEmailTemp(
    meeting_detail.interview_meeting.interview_schedule.recruiter_id,
    'interviewEnd_email_rShadowTraineeForMeetingAttendence',
  );

  const candidate =
    meeting_detail.interview_meeting.interview_schedule.applications.candidates;
  const organizer = meeting_detail.interview_meeting.recruiter_user;

  const job =
    meeting_detail.interview_meeting.interview_schedule.applications
      .public_jobs;

  const mail_details = training_ints.map((trainee) => {
    const shadowCount = module_relations.find(
      (s) => s.user_id === trainee.user_id,
    ).number_of_reverse_shadow;
    const comp_email_placeholder: EmailTemplateAPi<'interviewEnd_email_rShadowTraineeForMeetingAttendence'>['comp_email_placeholders'] =
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
        sessionName: meeting_detail.name,
        interviewType: meeting_detail.interview_module.name,
        companyName: job.company,
        jobRole: job.job_title,
        reverseShadowCount: numberToOrdinal(shadowCount),
        reverseShadowConfirmLink: `<a href="#' target="_blank">here</a>`,
      };

    const filled_comp_template = fillCompEmailTemplate(
      comp_email_placeholder,
      comp_email_temp,
    );
    const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_rShadowTraineeForMeetingAttendence'>['react_email_placeholders'] =
      {
        companyLogo: job.logo,
        emailBody: filled_comp_template.body,
        subject: filled_comp_template.subject,
      };

    return {
      comp_email_placeholder,
      filled_comp_template,
      react_email_placeholders,
      recipient_email: trainee.email,
    };
  });

  return mail_details;
}
