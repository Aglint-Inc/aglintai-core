import { type DatabaseTable } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  dayjsLocal,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';

import {
  getSupabaseServer,
  type SupabaseClientType,
} from '@/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateRequestProgress = async ({
  new_data,
  old_data,
}: {
  new_data: DatabaseTable['request_progress'];
  old_data: DatabaseTable['request_progress'];
}) => {
  const supabase = getSupabaseServer();
  if (
    new_data.event_type === 'SELF_SCHEDULE_LINK' &&
    new_data.is_progress_step === false &&
    new_data.status === 'completed' &&
    old_data.status !== 'completed'
  ) {
    await selfScheduleReminder({ request_id: new_data.request_id, supabase });
  }
  if (
    new_data.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK' &&
    new_data.is_progress_step === false &&
    new_data.status === 'completed'
  ) {
    await availReminder({ request_id: new_data.request_id, supabase });
  }
};

export const selfScheduleReminder = async ({
  request_id,
  supabase,
}: {
  request_id: string;
  supabase: SupabaseClientType;
}) => {
  try {
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: request_id,
      supabaseAdmin: supabase,
      event_type: 'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
    });
    await reqProgressLogger.resetEventProgress();

    const [req_details] = supabaseWrap(
      await supabase
        .from('request')
        .select('applications(*,public_jobs(*))')
        .eq('id', request_id),
    );
    const { request_workflows } = await getWActions({
      company_id: req_details.applications.public_jobs.recruiter_id,
      request_id: request_id,
    });
    const schedule_reminder_action = request_workflows.find(
      (j_l_a) => j_l_a.target_api === 'selfScheduleReminder_email_applicant',
    );
    const [filter_json] = supabaseWrap(
      await supabase
        .from('interview_filter_json')
        .select()
        .eq('request_id', request_id),
    );
    if (!schedule_reminder_action) return;
    const run_id = supabaseWrap(
      await supabase.rpc('create_new_workflow_action_log', {
        triggered_table: 'interview_filter_json',
        base_time: dayjsLocal().toISOString(),
        workflow_action_id: schedule_reminder_action.id,
        workflow_id: schedule_reminder_action.workflow_id,
        triggered_table_pkey: filter_json.id,
        interval_minutes: schedule_reminder_action.workflow.interval,
        meta: {
          target_api: schedule_reminder_action.target_api,
          filter_id: filter_json.id,
          payload: schedule_reminder_action.payload,
        },
        phase: schedule_reminder_action.workflow.phase,
      }),
    );
    await reqProgressLogger({
      is_progress_step: false,
      status: 'completed',
      meta: null,
    });
    await reqProgressLogger({
      is_progress_step: true,
      status: 'completed',
      meta: {
        workflow_action_id: schedule_reminder_action.id,
        event_run_id: run_id,
        scheduled_time: dayjsLocal()
          .add(schedule_reminder_action.workflow.interval, 'minutes')
          .toISOString(),
      },
    });
  } catch (e) {
    console.error('Failed selfScheduleReminder', e);
  }
};

export const availReminder = async ({
  request_id,
  supabase,
}: {
  request_id: string;
  supabase: SupabaseClientType;
}) => {
  try {
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: request_id,
      supabaseAdmin: supabase,
      event_type: 'SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK',
    });
    await reqProgressLogger.resetEventProgress();

    const [req_details] = supabaseWrap(
      await supabase
        .from('request')
        .select('applications(*,public_jobs(*))')
        .eq('id', request_id),
    );
    const [avail_req] = supabaseWrap(
      await supabase
        .from('candidate_request_availability')
        .select()
        .eq('request_id', request_id),
    );
    const { request_workflows } = await getWActions({
      company_id: req_details.applications.public_jobs.recruiter_id,
      request_id: request_id,
    });
    const avail_reminder_action = request_workflows.find(
      (j_l_a) => j_l_a.target_api === 'sendAvailReqReminder_email_applicant',
    );
    if (!avail_reminder_action) return;
    const run_id = supabaseWrap(
      await supabase.rpc('create_new_workflow_action_log', {
        triggered_table: 'candidate_request_availability',
        base_time: dayjsLocal().toISOString(),
        workflow_action_id: avail_reminder_action.id,
        workflow_id: avail_reminder_action.workflow_id,
        triggered_table_pkey: avail_req.id,
        interval_minutes: avail_reminder_action.workflow.interval,
        meta: {
          target_api: avail_reminder_action.target_api,
          avail_req_id: avail_req.id,
          payload: avail_reminder_action.payload,
        },
        phase: avail_reminder_action.workflow.phase,
      }),
    );

    await reqProgressLogger({
      is_progress_step: false,
      status: 'completed',
      meta: {
        workflow_action_id: avail_reminder_action.id,
        event_run_id: run_id,
        scheduled_time: dayjsLocal()
          .add(avail_reminder_action.workflow.interval, 'minutes')
          .toISOString(),
      },
    });
    await reqProgressLogger({
      is_progress_step: true,
      status: 'completed',
      meta: {
        workflow_action_id: avail_reminder_action.id,
        event_run_id: run_id,
        scheduled_time: dayjsLocal()
          .add(avail_reminder_action.workflow.interval, 'minutes')
          .toISOString(),
      },
    });
  } catch (e) {
    console.error('Failed availReminder', e);
  }
};
