import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateInterviewTrainingProgress = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_training_progress'];
  new_data: DatabaseTable['interview_training_progress'];
}) => {
  const [i_s_r] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .select('*,interview_module_relation(*,interview_module(*))')
      .eq('id', new_data.session_relation_id),
  );

  const [module_relation_view] = supabaseWrap(
    await supabaseAdmin
      .from('module_relations_view')
      .select()
      .eq('id', i_s_r.interview_module_relation_id),
  );
  const required_rshadow =
    i_s_r.interview_module_relation.number_of_reverse_shadow;
  const required_shadow = i_s_r.interview_module_relation.number_of_shadow;
  const total_shadow = module_relation_view.shadow_confirmed_count;
  const total_rshadow = module_relation_view.reverse_shadow_confirmed_count;
  if (
    !old_data.is_attended &&
    new_data.is_attended &&
    required_rshadow <= total_rshadow &&
    required_shadow <= total_shadow
  ) {
    await addJobsToQueue(
      new_data,
      i_s_r.interview_module_relation.interview_module.recruiter_id,
    );
  }
};

const addJobsToQueue = async (
  new_data: DatabaseTable['interview_training_progress'],
  company_id: string,
) => {
  try {
    const trig_actions: DatabaseEnums['email_slack_types'][] = [
      'onTrainingComplete_email_approverForTraineeMeetingQualification',
      'onTrainingComplete_slack_approverForTraineeMeetingQualification',
    ];

    const { company_actions } = await getWActions({
      company_id: company_id,
    });

    const promises = company_actions
      .filter((act) => trig_actions.find((a) => a === act.target_api))
      .map(async (act) => {
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            base_time: dayjsLocal().toISOString(),
            triggered_table: 'interview_training_progress',
            triggered_table_pkey: new_data.id,
            workflow_id: act.workflow_id,
            workflow_action_id: act.id,
            interval_minutes: act.workflow.interval,
            phase: act.workflow.phase,
            meta: {
              target_api: act.target_api,
              session_relation_id: new_data.session_relation_id,
              payload: act.payload,
            },
          }),
        );
      });

    await Promise.allSettled(promises);
  } catch (err) {
    console.error(`Failed onUpdateInterviewTrainingProgress `, err.message);
  }
};
