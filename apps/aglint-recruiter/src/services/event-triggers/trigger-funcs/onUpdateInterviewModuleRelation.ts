import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateInterviewModuleRelation = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_module_relation'];
  new_data: DatabaseTable['interview_module_relation'];
}) => {
  if (
    old_data.training_status === 'training' &&
    new_data.training_status === 'qualified'
  ) {
    await addToQueue(new_data);
  }
};

const addToQueue = async (
  new_data: DatabaseTable['interview_module_relation'],
) => {
  try {
    const [int_module] = supabaseWrap(
      await supabaseAdmin.from('interview_module').select(),
    );
    const trig_actions: DatabaseEnums['email_slack_types'][] = [
      'onQualified_email_trainee',
      'onQualified_slack_trainee',
    ];
    const { company_actions } = await getWActions({
      company_id: int_module.recruiter_id,
    });

    const act_promises = company_actions
      .filter((c_a) => trig_actions.find((a) => a === c_a.target_api))
      .map(async (act) => {
        let base_time = dayjsLocal().toISOString();

        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            base_time: base_time,
            triggered_table: 'interview_module_relation',
            triggered_table_pkey: new_data.id,
            workflow_id: act.workflow_id,
            workflow_action_id: act.id,
            interval_minutes: act.workflow.interval,
            phase: act.workflow.phase,
            meta: {
              target_api: act.target_api,
              interview_module_relation_id: new_data.id,
              payload: act.payload,
              approver_id: new_data.training_approver,
            },
          }),
        );
      });

    await Promise.allSettled(act_promises);
  } catch (err) {
    console.error(
      'Failed to addTo Queue onUpdateInterviewModuleRelation',
      err.message,
    );
  }
};
