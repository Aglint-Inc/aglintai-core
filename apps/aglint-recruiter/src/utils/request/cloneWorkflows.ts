import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { ApiError } from '@/src/utils/customApiError';

export const cloneWorkflows = async ({
  job_id,
  request_id,
  meeting_flow,
}: {
  job_id: string;
  request_id: string;
  meeting_flow?: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  const [request] = supabaseWrap(
    await supabaseAdmin.from('request').select().eq('id', request_id),
  );
  if (request.type === 'schedule_request' && !meeting_flow) {
    throw new ApiError('SERVER_ERROR', 'missing meeting flow');
  }
  const job_workflows = supabaseWrap(
    await supabaseAdmin
      .from('workflow_job_relation')
      .select('*, workflow(*, workflow_action(*))')
      .eq('job_id', job_id),
  );

  let filtered_workflows: typeof job_workflows = [];
  if (request.type === 'cancel_schedule_request') {
    filtered_workflows = job_workflows.filter(
      (j_w) => j_w.workflow.trigger === 'onRequestCancel',
    );
  } else if (request.type === 'decline_request') {
    filtered_workflows = job_workflows.filter(
      (j_w) => j_w.workflow.trigger === 'onRequestInterviewerDecline',
    );
  } else if (request.type === 'reschedule_request') {
    let triggers: DatabaseTable['workflow']['trigger'][] = [
      'onRequestReschedule',
      'onReceivingAvailReq',
      'sendAvailReqReminder',
      'selfScheduleReminder',
      'candidateBook',
    ];
    filtered_workflows = job_workflows.filter((j_w) =>
      triggers.includes(j_w.workflow.trigger),
    );
  } else if (request.type === 'schedule_request') {
    let triggers: DatabaseTable['workflow']['trigger'][] = [
      'onAvailReqAgent',
      'onReceivingAvailReq',
      'sendAvailReqReminder',
      'selfScheduleReminder',
      'candidateBook',
    ];
    filtered_workflows = job_workflows.filter((j_w) =>
      triggers.includes(j_w.workflow.trigger),
    );
  }
  const new_relations_promises = filtered_workflows.map(async (j_w) => {
    const [req_workflow] = supabaseWrap(
      await supabaseAdmin
        .from('workflow')
        .insert({
          phase: j_w.workflow.phase,
          recruiter_id: j_w.workflow.recruiter_id,
          trigger: j_w.workflow.trigger,
          auto_connect: j_w.workflow.auto_connect,
          interval: j_w.workflow.interval,
          is_paused: j_w.workflow.is_paused,
          title: j_w.workflow.title,
          workflow_type: j_w.workflow.workflow_type,
        })
        .select(),
    );

    const req_w_actions: DatabaseTableInsert['workflow_action'][] =
      j_w.workflow.workflow_action.map((act) => ({
        order: act.order,
        action_type: act.action_type,
        payload: act.payload as any,
        target_api: act.target_api as any,
        workflow_id: req_workflow.id,
      }));
    supabaseWrap(
      await supabaseAdmin
        .from('workflow_action')
        .insert(req_w_actions)
        .select(),
    );
    supabaseWrap(
      await supabaseAdmin.from('workflow_request_relation').insert({
        request_id: request_id,
        workflow_id: req_workflow.id,
      }),
    );
  });
  await Promise.all(new_relations_promises);
};
