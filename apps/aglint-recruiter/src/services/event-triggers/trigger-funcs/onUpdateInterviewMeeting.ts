import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { CApiError, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateInterviewMeeting = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_meeting'];
  new_data: DatabaseTable['interview_meeting'];
}) => {
  if (new_data.status === 'confirmed' && old_data.status !== 'confirmed') {
    await updateScheduleProgress({ new_data });

    await addJobsToQueue(new_data);
  }
};

const addJobsToQueue = async (new_data: DatabaseTable['interview_meeting']) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const session_details = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select()
        .eq('meeting_id', new_data.id)
        .single(),
    );
    let actions: DatabaseEnums['email_slack_types'][] = [
      'interviewStart_email_applicant',
      'interviewStart_email_organizer',
      'candidateBook_slack_interviewerForConfirmation',
      'interviewEnd_slack_organizerForMeetingStatus',
      'interviewEnd_email_organizerForMeetingStatus',
      'interviewEnd_email_shadowTraineeForMeetingAttendence',
      'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_shadowTraineeForMeetingAttendence',
    ];
    if (session_details.session_type === 'debrief') {
      actions = [
        'interviewStart_email_applicant',
        'interviewStart_email_organizer',
        'candidateBook_slack_interviewerForConfirmation',
        'interviewEnd_slack_organizerForMeetingStatus',
        'interviewEnd_email_organizerForMeetingStatus',
      ];
    } else {
      actions = [
        'interviewStart_email_applicant',
        'interviewStart_email_organizer',
        'candidateBook_slack_interviewerForConfirmation',
        'interviewEnd_slack_organizerForMeetingStatus',
        'interviewEnd_email_organizerForMeetingStatus',
        'interviewEnd_email_shadowTraineeForMeetingAttendence',
        'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        'interviewEnd_slack_shadowTraineeForMeetingAttendence',
      ];
    }
    const jobs_set: Set<DatabaseEnums['email_slack_types']> = new Set(actions);
    await stopJobPreviouslyQueuedJobs(new_data);
    const schedule_application = (
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs(*)')
        .eq('id', new_data.application_id)
        .single()
        .throwOnError()
    ).data;
    if (!schedule_application) {
      throw new CApiError('SERVER_ERROR', 'Application not found');
    }
    if (!schedule_application.public_jobs) {
      throw new CApiError('SERVER_ERROR', 'Job not found');
    }

    const { request_workflows, company_actions } = await getWActions({
      company_id: schedule_application.public_jobs.recruiter_id,
      request_id: new_data.schedule_request_id,
    });
    const meeting_details = (
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('id', new_data.id)
        .single()
        .throwOnError()
    ).data;
    if (!meeting_details) {
      throw new CApiError('SERVER_ERROR', 'Meeting details not found');
    }
    const all_actions = [...request_workflows, ...company_actions]
      .filter((act) => jobs_set.has(act.target_api))
      .map(async (act) => {
        let base_time = dayjsLocal().toISOString();
        if (act.workflow.trigger === 'interviewEnd' && new_data.end_time) {
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
              meeting_id: new_data.id,
              application_id: schedule_application.id,
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
  } catch (err: any) {
    console.error('Failed to perform', err.message);
  }
};

const stopJobPreviouslyQueuedJobs = async (
  new_data: DatabaseTable['interview_meeting'],
) => {
  const supabaseAdmin = getSupabaseServer();

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

const updateScheduleProgress = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_meeting'];
}) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const schedule_req_id = new_data.schedule_request_id;
    if (!schedule_req_id) {
      console.error('schedule_request_id not found');
      return;
    }

    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', schedule_req_id),
    );
  } catch (err) {
    console.error('Failed to update schedule progress', err.message);
  }
};
