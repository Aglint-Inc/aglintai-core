import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onInsertInterviewFilterJson = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_filter_json'];
}) => {
  await eventTrigger({
    new_data,
  });
};

const eventTrigger = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_filter_json'];
}) => {
  try {
    let reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: new_data.request_id,
      supabaseAdmin,
      event_run_id: null,
      target_api: null,
    });
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'in_progress',
        })
        .eq('id', new_data.request_id),
    );

    const allowed_end_points: DatabaseEnums['email_slack_types'][] = [
      'selfScheduleReminder_email_applicant',
    ];

    if (new_data.session_ids.length === 0) return;
    const [schedule_cand_rec] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs(*)')
        .eq('id', new_data.application_id),
    );

    const { request_workflows } = await getWActions({
      company_id: schedule_cand_rec.public_jobs.recruiter_id,
      request_id: new_data.request_id,
    });

    const promises = request_workflows
      .filter((j_l_a) => allowed_end_points.find((e) => e === j_l_a.target_api))
      .map(async (j_l_a) => {
        const event_run_id = supabaseWrap(
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
        if (j_l_a.target_api === 'selfScheduleReminder_email_applicant') {
          console.log(j_l_a.id);
          await reqProgressLogger({
            event_type: 'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
            is_progress_step: false,
            status: 'completed',
          });
          await reqProgressLogger({
            event_type: 'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
            is_progress_step: true,
            status: 'completed',
            meta: {
              event_run_id,
              workflow_action_id: j_l_a.id,
              scheduled_time: dayjsLocal()
                .add(j_l_a.workflow.interval, 'minutes')
                .toISOString(),
            },
          });
        }
      });

    await Promise.allSettled(promises);
  } catch (err) {
    console.error(
      'Failed to perform event trigger onInsertInterviewFilterJson',
    );
    console.error(new_data);
  }
};
