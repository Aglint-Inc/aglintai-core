import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { isArray } from 'lodash';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateCandidateRequestAvailability = async ({
  new_data,
  old_data,
}: {
  new_data: DatabaseTable['candidate_request_availability'];
  old_data: DatabaseTable['candidate_request_availability'];
}) => {
  // candidate availability recieved
  if (
    old_data.slots === null &&
    isArray(new_data.slots) &&
    new_data.slots.length > 0
  ) {
    await updateRequestProgress(new_data);
    await pauseCandAvailabilityReminder(new_data.id);
    await triggerActions(new_data);
  }
  //
  if (
    old_data.booking_confirmed === false &&
    new_data.booking_confirmed === true
  ) {
    supabaseWrap(
      await supabaseAdmin.from('request_progress').insert({
        event_type: 'CAND_CONFIRM_SLOT',
        request_id: new_data.request_id,
        status: 'completed',
        is_progress_step: false,
      }),
    );
  }
};

const triggerActions = async (
  new_data: DatabaseTable['candidate_request_availability'],
) => {
  try {
    const allowed_end_points: DatabaseEnums['email_slack_types'][] = [
      'onReceivingAvailReq_agent_confirmSlot',
      'onReceivingAvailReq_agent_sendSelfScheduleRequest',
    ];

    const [applications] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs(*)')
        .eq('id', new_data.application_id),
    );

    const { request_workflows } = await getWActions({
      company_id: applications.public_jobs.recruiter_id,
      request_id: new_data.request_id,
    });

    const promises = request_workflows
      .filter((j_l_a) => allowed_end_points.find((e) => e === j_l_a.target_api))
      .map(async (j_l_a) => {
        supabaseWrap(
          await supabaseAdmin.rpc('create_new_workflow_action_log', {
            triggered_table: 'candidate_request_availability',
            base_time: dayjsLocal().toISOString(),
            workflow_action_id: j_l_a.id,
            workflow_id: j_l_a.workflow_id,
            triggered_table_pkey: new_data.id,
            interval_minutes: j_l_a.workflow.interval,
            meta: {
              target_api: j_l_a.target_api,
              candidate_availability_request_id: new_data.id,
              recruiter_id: j_l_a.workflow.recruiter_id,
              application_id: new_data.application_id,
              request_id: new_data.request_id,
              payload: j_l_a.payload,
            },
            phase: j_l_a.workflow.phase,
          }),
        );
      });
    await Promise.allSettled(promises);
  } catch (err) {
    console.error(err.message);
  }
};

const pauseCandAvailabilityReminder = async (cand_avail_id: string) => {
  try {
    supabaseWrap(
      await supabaseAdmin
        .from('workflow_action_logs')
        .update({
          status: 'stopped',
        })
        .eq('meta->>target_api', 'sendAvailReqReminder_email_applicant')
        .eq('related_table', 'candidate_request_availability')
        .eq('related_table_pkey', cand_avail_id),
    );
  } catch (err) {
    console.error('unable to pause', cand_avail_id);
  }
};

const updateRequestProgress = async (
  new_data: DatabaseTable['candidate_request_availability'],
) => {
  try {
    supabaseWrap(
      await supabaseAdmin.from('request_progress').insert({
        event_type: 'CAND_AVAIL_REC',
        request_id: new_data.request_id,
        status: 'completed',
        is_progress_step: false,
      }),
    );
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', new_data.request_id),
    );
  } catch (err) {
    //
  }
};
