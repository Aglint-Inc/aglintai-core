import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateRequest = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['request'];
  new_data: DatabaseTable['request'];
}) => {
  if (old_data.status === 'to_do' && new_data.status === 'in_progress') {
    await triggerActions(new_data);
  }
};

const triggerActions = async (new_data: DatabaseTable['request']) => {
  try {
    const [applications] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select()
        .eq('id', new_data.application_id),
    );
    const req_relns = supabaseWrap(
      await supabaseAdmin
        .from('request_relation')
        .select()
        .eq('request_id', new_data.id),
    );

    const { job_level_actions } = await getWActions(applications.job_id);

    const promises = job_level_actions
      .filter(
        (j_l_a) =>
          (new_data.type === 'schedule_request' &&
            (j_l_a.workflow.trigger === 'onAvailReqAgent' ||
              j_l_a.workflow.trigger === 'onSelfScheduleReqAgent')) ||
          (new_data.type === 'reschedule_request' &&
            j_l_a.workflow.trigger === 'onRequestReschedule') ||
          (new_data.type === 'cancel_schedule_request' &&
            j_l_a.workflow.trigger === 'onRequestCancel') ||
          (new_data.type === 'decline_request' &&
            j_l_a.workflow.trigger === 'onRequestInterviewerDecline'),
      )
      .map(async (j_l_a) => {
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            triggered_table: 'request',
            base_time: dayjsLocal().toISOString(),
            workflow_action_id: j_l_a.id,
            workflow_id: j_l_a.workflow_id,
            triggered_table_pkey: new_data.id,
            interval_minutes: j_l_a.workflow.interval,
            meta: {
              target_api: j_l_a.target_api,
              payload: j_l_a.payload,
              request_id: new_data.id,
              session_ids: req_relns.map((reln) => reln.session_id),
              recruiter_id: j_l_a.workflow.recruiter_id,
              application_id: new_data.application_id,
            },
            phase: j_l_a.workflow.phase,
          }),
        );
      });
    await Promise.allSettled(promises);
  } catch (err) {
    console.error(`Failed update request status event`, err.message);
  }
};
