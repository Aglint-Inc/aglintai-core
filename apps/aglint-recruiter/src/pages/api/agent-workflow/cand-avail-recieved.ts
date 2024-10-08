import { type DatabaseEnums } from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  executeWorkflowAction,
  supabaseWrap,
} from '@aglint/shared-utils';
import { apiTargetToEvents } from '@request/components/RequestProgress/utils/progressMaps';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { slackSuggestSlots } from '@/services/api-schedulings/avail-recieved/slackSuggestSlots';
import { candidateSelfScheduleLink } from '@/services/api-schedulings/utils/candidateSelfScheduleLink';
import { findCandSelectedSlots } from '@/services/api-schedulings/utils/findCandSelectedSlots';
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
  const avail_record = (
    await supabaseAdmin
      .from('candidate_request_availability')
      .select('*,request_session_relation!inner(*)')
      .eq('id', candidate_availability_request_id)
      .single()
      .throwOnError()
  ).data;

  if (!avail_record) {
    throw new CApiError('SERVER_ERROR', 'No availability record found');
  }

  const session_ids = avail_record.request_session_relation.map(
    (s) => s.session_id,
  );

  const selected_slots_from_instruction = await executeWorkflowAction(
    findCandSelectedSlots,
    {
      agent_instruction: req_body.payload.agent.instruction,
      cand_avail: avail_record.slots,
      company_id: recruiter_id,
      date_range: {
        start_date_str: avail_record.date_range[0],
        end_date_str: avail_record.date_range[1],
      },
      session_ids,
      time_zone: request_assignee_tz,
      reqProgressLogger,
    },
    reqProgressLogger,
  );

  if (target_api === 'onReceivingAvailReq_agent_suggestSlots') {
    await executeWorkflowAction(
      slackSuggestSlots,
      {
        avail_plans: selected_slots_from_instruction,
        cand_avail_rec: avail_record,
        request_id,
      },
      reqProgressLogger,
    );
  } else if (
    target_api === 'onReceivingAvailReq_agent_sendSelfScheduleRequest'
  ) {
    await executeWorkflowAction(
      candidateSelfScheduleLink,
      {
        parsed_body: {
          application_id: request_rec.application_id,
          event_run_id,
          // payload:, ??
          request_id,
          recruiter_id,
          session_ids,
          target_api,
        },
        selected_slots_from_instruction,
        reqProgressLogger,
        req_assignee_tz: request_assignee_tz,
        organizer_id: request_rec.assignee_id,

        date_range: {
          start_date_str: avail_record.date_range[0],
          end_date_str: avail_record.date_range[1],
        },
        job_payload: req_body.payload,
      },
      reqProgressLogger,
    );
  }
};

export default createPageApiPostRoute(null, candAvailRecieved);
