import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { getWActions } from '@/services/event-triggers/utils/w_actions';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  request_id: z.string(),
});
const executeWorkflow = async (parsed_body: z.output<typeof schema>) => {
  const supabaseAdmin = getSupabaseServer();

  const { request_id } = parsed_body;
  const request = supabaseWrap(
    await supabaseAdmin.from('request').select().eq('id', request_id).single(),
  );
  await triggerActions(request);
};

const triggerActions = async (request_data: DatabaseTable['request']) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const exisitng_job = supabaseWrap(
      await supabaseAdmin
        .from('workflow_action_logs')
        .select()
        .eq('related_table_pkey', request_data.id)
        .eq('related_table', 'request')
        .limit(1),
      false,
    );

    if (exisitng_job.length > 0) {
      console.error('Job already exists for this request');
      return;
    }

    const [applications] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs!inner(*)')
        .eq('id', request_data.application_id),
    );
    const req_relns = supabaseWrap(
      await supabaseAdmin
        .from('request_relation')
        .select()
        .eq('request_id', request_data.id),
    );

    const { request_workflows } = await getWActions({
      company_id: applications.public_jobs.recruiter_id,
      request_id: request_data.id,
    });

    const promises = request_workflows
      .filter(
        (j_l_a) =>
          (request_data.type === 'schedule_request' &&
            j_l_a.workflow.trigger === 'onRequestSchedule') ||
          (request_data.type === 'reschedule_request' &&
            j_l_a.workflow.trigger === 'onRequestSchedule') ||
          (request_data.type === 'cancel_schedule_request' &&
            j_l_a.workflow.trigger === 'onRequestCancel') ||
          (request_data.type === 'decline_request' &&
            j_l_a.workflow.trigger === 'onRequestInterviewerDecline'),
      )
      .map(async (j_l_a) => {
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            triggered_table: 'request',
            base_time: dayjsLocal().toISOString(),
            workflow_action_id: j_l_a.id,
            workflow_id: j_l_a.workflow_id,
            triggered_table_pkey: request_data.id,
            interval_minutes: j_l_a.workflow.interval,
            meta: {
              target_api: j_l_a.target_api,
              payload: j_l_a.payload,
              request_id: request_data.id,
              session_ids: req_relns.map((reln) => reln.session_id),
              recruiter_id: j_l_a.workflow.recruiter_id,
              application_id: request_data.application_id,
            },
            phase: j_l_a.workflow.phase,
          }),
        );
      });
    await Promise.allSettled(promises);
  } catch (err: any) {
    console.error(`Failed update request status event`, err.message);
  }
};

export default createPageApiPostRoute(schema, executeWorkflow);
