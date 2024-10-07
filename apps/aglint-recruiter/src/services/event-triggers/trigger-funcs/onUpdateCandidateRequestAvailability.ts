/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { isArray } from 'lodash';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { getWActions } from '../utils/w_actions';

export const onUpdateCandidateRequestAvailability = async ({
  new_data,
  old_data,
}: {
  new_data: DatabaseTable['candidate_request_availability'];
  old_data: DatabaseTable['candidate_request_availability'];
}) => {
  const supabaseAdmin = getSupabaseServer();
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
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', new_data.request_id),
    );
  }
  if (
    old_data.visited &&
    !new_data.visited &&
    old_data.slots &&
    old_data.slots.length > 0 &&
    new_data.slots === null
  ) {
    reRequestingAvailability(new_data);
  }
};

const triggerActions = async (
  new_data: DatabaseTable['candidate_request_availability'],
) => {
  const supabaseAdmin = getSupabaseServer();

  try {
    const allowed_end_points: DatabaseEnums['email_slack_types'][] = [
      'onReceivingAvailReq_agent_suggestSlots',
      'onReceivingAvailReq_agent_sendSelfScheduleRequest',
    ];

    const application = (
      await supabaseAdmin
        .from('applications')
        .select('*,public_jobs(*)')
        .eq('id', new_data.application_id)
        .single()
        .throwOnError()
    ).data;
    if (!application || !application.public_jobs) {
      throw new CApiError('SERVER_ERROR', 'Application not found');
    }
    const { request_workflows } = await getWActions({
      company_id: application.public_jobs.recruiter_id,
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
  } catch (err: any) {
    console.error(err.message);
  }
};

const pauseCandAvailabilityReminder = async (cand_avail_id: string) => {
  const supabaseAdmin = getSupabaseServer();

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
  const supabaseAdmin = getSupabaseServer();

  try {
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: new_data.request_id,
      supabaseAdmin,
      event_type: 'CAND_AVAIL_REC',
    });
    await reqProgressLogger({
      is_progress_step: false,
      status: 'completed',
    });
    await reqProgressLogger({
      is_progress_step: true,
      status: 'completed',
      meta: {
        event_run_id: null,
        candidate_submitted_slots: new_data.slots,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const reRequestingAvailability = async (
  new_data: DatabaseTable['candidate_request_availability'],
) => {
  const supabaseAdmin = getSupabaseServer();

  try {
    const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
      request_id: new_data.request_id,
      supabaseAdmin,
      event_type: 'CANDIDATE_AVAILABILITY_RE_REQUESTED',
    });
    await reqProgressLogger({
      is_progress_step: false,
      status: 'completed',
    });
    await reqProgressLogger({
      meta: {
        re_requested_date: {
          start_date: new_data.date_range[0],
          end_date: new_data.date_range[1],
        },
        avail_req_id: new_data.id,
      },
      is_progress_step: true,
      status: 'completed',
    });
  } catch (err) {
    console.error(`reRequestingAvailability`, err);
  }
};
