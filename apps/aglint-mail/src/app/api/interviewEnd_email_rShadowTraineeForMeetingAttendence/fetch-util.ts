import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
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
  const [session_detail] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_module(*), interview_meeting(*, recruiter_user(*), interview_schedule(*, applications(*, public_jobs(*,recruiter_table:recruiter(name,logo)),candidates(*))))',
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

  const candidate =
    session_detail.interview_meeting.interview_schedule.applications.candidates;
  const organizer = session_detail.interview_meeting.recruiter_user;

  const job =
    session_detail.interview_meeting.interview_schedule.applications
      .public_jobs;

  const mail_details = training_ints.map((trainee) => {
    const trainee_data = module_relations.find(
      (s) => s.user_id === trainee.user_id && s.module_id === trainee.module_id,
    );
    const reverseShadowCount =
      trainee_data.reverse_shadow_confirmed_count +
      trainee_data.reverse_shadow_completed_count;
    const meeting_details_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${session_detail.interview_meeting.id}&tab=candidate_details`;

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
        sessionName: session_detail.name,
        interviewType: session_detail.interview_module.name,
        companyName: job.recruiter_table.name,
        jobRole: job.job_title,
        reverseShadowCount: numberToOrdinal(reverseShadowCount),
        reverseShadowConfirmLink: `<a href=${meeting_details_link} target="_blank">here</a>`,
      };

    const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_rShadowTraineeForMeetingAttendence'>['react_email_placeholders'] =
      {
        companyLogo: job.recruiter_table.logo,
      };

    return {
      company_id: candidate.recruiter_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: trainee.email,
    };
  });

  return mail_details;
}
