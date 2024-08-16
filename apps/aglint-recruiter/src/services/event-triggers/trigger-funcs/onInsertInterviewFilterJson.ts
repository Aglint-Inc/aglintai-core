import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onInsertInterviewFilterJson = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_filter_json'];
}) => {
  const allowed_end_points: DatabaseEnums['email_slack_types'][] = [
    'selfScheduleReminder_email_applicant',
  ];

  if (new_data.session_ids.length === 0) return;
  const [schedule_cand_rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .select('*, applications(*)')
      .eq('id', new_data.schedule_id),
  );

  const { job_level_actions } = await getWActions(
    schedule_cand_rec.applications.job_id,
  );

  const promises = job_level_actions
    .filter((j_l_a) => allowed_end_points.find((e) => e === j_l_a.target_api))
    .map(async (j_l_a) => {
      supabaseWrap(
        await supabaseAdmin.rpc('create_new_workflow_action_log', {
          triggered_table: 'interview_filter_json',
          base_time: dayjsLocal().toISOString(),
          workflow_action_id: j_l_a.id,
          workflow_id: j_l_a.workflow_id,
          triggered_table_pkey: new_data.id,
          interval_minutes: j_l_a.workflow.interval,
          meta: {
            target_api: j_l_a.target_api,
            filter_id: new_data.id,
            payload: j_l_a.payload,
          },
          phase: j_l_a.workflow.phase,
        }),
      );
    });

  await Promise.allSettled(promises);
};
