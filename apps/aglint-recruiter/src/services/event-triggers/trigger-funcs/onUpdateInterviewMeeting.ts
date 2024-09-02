import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateInterviewMeeting = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_meeting'];
  new_data: DatabaseTable['interview_meeting'];
}) => {
  if (new_data.status === 'confirmed' && old_data.status === 'waiting') {
    await addJobsToQueue(new_data);
  }
};

const addJobsToQueue = async (new_data: DatabaseTable['interview_meeting']) => {
  try {
    const jobs_set: Set<DatabaseEnums['email_slack_types']> = new Set([
      'interviewStart_email_applicant',
      'interviewStart_email_organizer',
      'candidateBook_slack_interviewerForConfirmation',
      'interviewEnd_slack_organizerForMeetingStatus',
      'interviewEnd_email_organizerForMeetingStatus',
      'interviewEnd_email_shadowTraineeForMeetingAttendence',
      'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_shadowTraineeForMeetingAttendence',
    ]);
    await stopJobPreviouslyQueuedJobs(new_data);
    const [schedule_application] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .select('*,applications(*,public_jobs(*))')
        .eq('id', new_data.interview_schedule_id),
    );

    const { request_workflows, company_actions } = await getWActions({
      company_id: schedule_application.applications.public_jobs.recruiter_id,
      request_id: new_data.schedule_request_id,
    });
    const [meeting_details] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('id', new_data.id),
    );
    const all_actions = [...request_workflows, ...company_actions]
      .filter((act) => jobs_set.has(act.target_api))
      .map(async (act) => {
        let base_time = dayjsLocal().toISOString();
        if (act.workflow.trigger === 'interviewEnd') {
          base_time = new_data.end_time;
        }
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            base_time: base_time,
            triggered_table: 'interview_meeting',
            triggered_table_pkey: new_data.id,
            workflow_id: act.workflow_id,
            workflow_action_id: act.id,
            interval_minutes: act.workflow.interval,
            phase: act.workflow.phase,
            meta: {
              schedule_id: new_data.interview_schedule_id,
              meeting_id: new_data.id,
              application_id: schedule_application.application_id,
              target_api: act.target_api,
              organizer_id: new_data.organizer_id,
              session_id: meeting_details.session_id,
              payload: act.payload,
              request_id: new_data.schedule_request_id,
            },
          }),
        );
      });
    await Promise.allSettled(all_actions);
  } catch (err) {
    console.error('Failed to perform', err.message);
  }
};

const stopJobPreviouslyQueuedJobs = async (
  new_data: DatabaseTable['interview_meeting'],
) => {
  supabaseWrap(
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({
        status: 'stopped',
      })
      .eq('related_table', 'interview_meeting')
      .eq('related_table_pkey', new_data.id)
      .eq('status', 'not_started'),
  );
};
