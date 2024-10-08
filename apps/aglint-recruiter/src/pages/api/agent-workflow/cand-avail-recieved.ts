import { type DatabaseEnums } from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  executeWorkflowAction,
  supabaseWrap,
} from '@aglint/shared-utils';
import { apiTargetToEvents } from '@request/components/RequestProgress/utils/progressMaps';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { candidateSelfSchedule } from '@/services/api-schedulings/candidateSelfSchedule';
import { findPlansFromCandAvailWithAgentInstruct } from '@/services/api-schedulings/findPlansFromCandAvailWithAgentInstruct';
import { slackSuggestSlots } from '@/services/api-schedulings/slackSuggestSlots';
import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type BodyParams = {
  candidate_availability_request_id: string;
  recruiter_id: string;
  request_id: string;
  event_run_id: number;
  target_api: DatabaseEnums['email_slack_types'];
  payload: any;
};

const candAvailRecieved = async (req_body: BodyParams) => {
  const {
    candidate_availability_request_id,
    recruiter_id,
    request_id,
    event_run_id,
    target_api,
  } = req_body;
  const supabaseAdmin = getSupabaseServer();
  const event = apiTargetToEvents[target_api];
  if (!event) {
    throw new CApiError('SERVER_ERROR', 'eventAction not found');
  }
  const reqProgressLogger = createRequestProgressLogger({
    request_id,
    event_run_id,
    supabaseAdmin,
    event_type: event,
  });
  await reqProgressLogger.resetEventProgress();

  const request_rec = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,recruiter_user!request_assignee_id_fkey!inner(*)')
      .eq('id', request_id)
      .single(),
  );

  const request_assignee_tz =
    request_rec.recruiter_user.scheduling_settings.timeZone.tzCode;
  const avail_record = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select('*,request_session_relation!inner(*)')
      .eq('id', candidate_availability_request_id)
      .single(),
  );

  const session_ids = avail_record.request_session_relation.map(
    (s) => s.session_id,
  );
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      show_soft_conflicts: true,
      out_of_working_hrs: true,
    },
    return_empty_slots_err: true,
  });

  await cand_schedule.fetchDetails({
    params: {
      session_ids,
      start_date_str: avail_record.date_range[0],
      end_date_str: avail_record.date_range[1],
      company_id: recruiter_id,
      req_user_tz: request_assignee_tz,
    },
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }

  const picked_slots = await executeWorkflowAction(
    findPlansFromCandAvailWithAgentInstruct,
    {
      reqProgressLogger,
      session_ids,
      time_zone: request_assignee_tz,
      recruiter_id: recruiter_id,
      date_range: {
        start_date_str: avail_record.date_range[0],
        end_date_str: avail_record.date_range[1],
      },
      agent_instruction: req_body.payload.agent.instruction,
    },
    reqProgressLogger,
  );

  if (target_api === 'onReceivingAvailReq_agent_suggestSlots') {
    await executeWorkflowAction(
      slackSuggestSlots,
      {
        avail_plans: picked_slots,
        cand_avail_rec: avail_record,
        cand_schedule_db: cand_schedule.db_details,
        reqProgressLogger,
        request_id,
      },
      reqProgressLogger,
    );
  } else if (
    target_api === 'onReceivingAvailReq_agent_sendSelfScheduleRequest'
  ) {
    await executeWorkflowAction(
      candidateSelfSchedule,
      {
        parsed_body: {
          application_id: request_rec.application_id,
          event_run_id,
          request_id,
          recruiter_id,
          session_ids,
          target_api,
        },
        reqProgressLogger,
        req_assignee_tz: request_assignee_tz,
        organizer_id: request_rec.assignee_id,
        date_range: {
          start_date_str: avail_record.date_range[0],
          end_date_str: avail_record.date_range[1],
        },
        job_payload: req_body.payload,
        candidate_slots: picked_slots,
      },
      reqProgressLogger,
    );
  }
};

export default createPageApiPostRoute(null, candAvailRecieved);
