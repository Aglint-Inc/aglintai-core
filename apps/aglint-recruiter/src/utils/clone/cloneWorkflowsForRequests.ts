import {
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';

export const cloneWorkflowsForRequests = async ({
  request_id,
}: {
  request_id: string;
  meeting_flow?: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  const supabaseAdmin = getSupabaseServer();

  const [request] = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications!inner(*)')
      .eq('id', request_id),
  );
  const job_id = request.applications.job_id;

  const job_workflows = supabaseWrap(
    await supabaseAdmin
      .from('workflow_job_relation')
      .select('*, workflow!inner(*, workflow_action!inner(*))')
      .eq('job_id', job_id)
      .eq('workflow.workflow_type', 'job'),
    false,
  );

  const filtered_workflows: typeof job_workflows = [...job_workflows].filter(
    (w) => w.workflow.is_active,
  );

  const new_relations_promises = filtered_workflows.map(async (j_w) => {
    const req_workflow = supabaseWrap(
      await supabaseAdmin
        .from('workflow')
        .insert({
          phase: j_w.workflow.phase,
          recruiter_id: j_w.workflow.recruiter_id,
          trigger: j_w.workflow.trigger,
          auto_connect: j_w.workflow.auto_connect,
          interval: j_w.workflow.interval,
          is_active: true,
          title: j_w.workflow.title,
          workflow_type: 'request',
          request_id: request_id,
        })
        .select()
        .single(),
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
      false,
    );
  });
  await Promise.all(new_relations_promises);

  const req_w_relns = supabaseWrap(
    await supabaseAdmin
      .from('workflow')
      .select('*, workflow_action(*)')
      .eq('request_id', request_id),
    false,
  );
  return req_w_relns;
};
