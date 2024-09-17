import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
import { DatabaseTable } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  dayjsLocal,
  ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import { getWActions } from '../utils/w_actions';

export const onUpdateRequestProgress = async ({
  new_data,
  old_data,
}: {
  new_data: DatabaseTable['request_progress'];
  old_data: DatabaseTable['request_progress'];
}) => {
  await updateRequestStatus({ new_data });
  if (
    new_data.event_type === 'SELF_SCHEDULE_LINK' &&
    new_data.is_progress_step === false &&
    new_data.status === 'completed' &&
    old_data.status !== 'completed'
  ) {
    console.log('lol run_id', 'lol');
    // await selfScheduleReminder({ new_data });
  }
  // if (
  //   new_data.event_type === 'REQ_CAND_AVAIL_EMAIL_LINK' &&
  //   new_data.is_progress_step === false &&
  //   new_data.status === 'completed'
  // ) {
  //   await availReminder({ new_data });
  // }
};

const updateRequestStatus = async ({
  new_data,
}: {
  new_data: DatabaseTable['request_progress'];
}) => {
  try {
    supabaseWrap(
      await getSupabaseServer()
        .from('request')
        .update({ status: 'in_progress' })
        .eq('id', new_data.request_id),
    );
  } catch (error) {
    console.error('Failed updateRequestStatus', error);
  }
};

export const selfScheduleReminder = async ({
  new_data,
}: {
  new_data: DatabaseTable['request_progress'];
}) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: new_data.request_id,
      supabaseAdmin,
      event_type: 'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
    });
    await reqProgressLogger.resetEventProgress();

    const [req_details] = supabaseWrap(
      await supabaseAdmin
        .from('request')
        .select('applications(*,public_jobs(*))')
        .eq('id', new_data.request_id),
    );
    const { request_workflows } = await getWActions({
      company_id: req_details.applications.public_jobs.recruiter_id,
      request_id: new_data.request_id,
    });
    const schedule_reminder_action = request_workflows.find(
      (j_l_a) => j_l_a.target_api === 'selfScheduleReminder_email_applicant',
    );
    if (!schedule_reminder_action) return;
    const run_id = supabaseWrap(
      await supabaseAdmin.rpc('create_new_workflow_action_log', {
        triggered_table: 'interview_filter_json',
        base_time: dayjsLocal().toISOString(),
        workflow_action_id: schedule_reminder_action.id,
        workflow_id: schedule_reminder_action.workflow_id,
        triggered_table_pkey: new_data.id,
        interval_minutes: schedule_reminder_action.workflow.interval,
        meta: {
          target_api: schedule_reminder_action.target_api,
          filter_id: new_data.id,
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
    // await reqProgressLogger({
    //   is_progress_step: true,
    //   status: 'completed',
    //   meta: {
    //     workflow_action_id: schedule_reminder_action.id,
    //     event_run_id: run_id,
    //     scheduled_time: dayjsLocal()
    //       .add(schedule_reminder_action.workflow.interval, 'minutes')
    //       .toISOString(),
    //   },
    // });
  } catch (e) {
    console.error('Failed selfScheduleReminder', e);
  }
};

export const availReminder = async ({
  new_data,
}: {
  new_data: DatabaseTable['request_progress'];
}) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: new_data.request_id,
      supabaseAdmin,
      event_type: 'SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK',
    });
    await reqProgressLogger.resetEventProgress();

    const [req_details] = supabaseWrap(
      await supabaseAdmin
        .from('request')
        .select('applications(*,public_jobs(*))')
        .eq('id', new_data.request_id),
    );
    const { request_workflows } = await getWActions({
      company_id: req_details.applications.public_jobs.recruiter_id,
      request_id: new_data.request_id,
    });
    const avail_reminder_action = request_workflows.find(
      (j_l_a) => j_l_a.target_api === 'sendAvailReqReminder_email_applicant',
    );
    if (!avail_reminder_action) return;
    const run_id = supabaseWrap(
      await supabaseAdmin.rpc('create_new_workflow_action_log', {
        triggered_table: 'candidate_request_availability',
        base_time: dayjsLocal().toISOString(),
        workflow_action_id: avail_reminder_action.id,
        workflow_id: avail_reminder_action.workflow_id,
        triggered_table_pkey: new_data.id,
        interval_minutes: avail_reminder_action.workflow.interval,
        meta: {
          target_api: avail_reminder_action.target_api,
          avail_req_id: new_data.id,
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
