import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { CApiError, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateInterviewTrainingProgress = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_training_progress'];
  new_data: DatabaseTable['interview_training_progress'];
}) => {
  const supabaseAdmin = getSupabaseServer();

  const i_s_r = (
    await supabaseAdmin
      .from('interview_session_relation')
      .select('*,interview_module_relation(*,interview_module(*))')
      .eq('id', new_data.session_relation_id)
      .single()
      .throwOnError()
  ).data;
  if (
    !i_s_r ||
    !i_s_r.interview_module_relation_id ||
    !i_s_r.interview_module_relation ||
    !i_s_r.interview_module_relation.interview_module
  ) {
    throw new CApiError('SERVER_ERROR', 'Interview session relation not found');
  }

  const module_relation_view = (
    await supabaseAdmin
      .from('module_relations_view')
      .select()
      .eq('id', i_s_r.interview_module_relation_id)
      .single()
      .throwOnError()
  ).data;
  if (!module_relation_view) {
    throw new CApiError('SERVER_ERROR', 'Interview module relation not found');
  }
  const required_rshadow =
    i_s_r.interview_module_relation.number_of_reverse_shadow;
  const required_shadow = i_s_r.interview_module_relation.number_of_shadow;
  const total_shadow = module_relation_view.shadow_confirmed_count ?? 0;
  const total_rshadow =
    module_relation_view.reverse_shadow_confirmed_count ?? 0;
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
  const supabaseAdmin = getSupabaseServer();

  try {
    const trig_actions: DatabaseEnums['email_slack_types'][] = [
      'onTrainingComplete_email_approverForTraineeMeetingQualification',
      'onTrainingComplete_slack_approverForTraineeMeetingQualification',
    ];

    const { company_actions } = await getWActions({
      company_id: company_id,
      request_id: null,
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
  } catch (err: any) {
    console.error(`Failed onUpdateInterviewTrainingProgress `, err.message);
  }
};
