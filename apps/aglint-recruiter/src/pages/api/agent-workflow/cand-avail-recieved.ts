import { type DatabaseEnums } from '@aglint/shared-types';
import {
  CApiError,
  createRequestProgressLogger,
  executeWorkflowAction,
} from '@aglint/shared-utils';
import { apiTargetToEvents } from '@requests/components/RequestProgress/utils/progressMaps';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { findCandSelectedSlots } from '@/services/api-schedulings/findCandSelectedSlots';
import { slackSuggestSlots } from '@/services/api-schedulings/slackSuggestSlots';
import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type BodyParams = {
  candidate_availability_request_id: string;
  recruiter_id: string;
  request_id: string;
  event_run_id: number;
  target_api: DatabaseEnums['email_slack_types'];
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

  const request_rec = (
    await supabaseAdmin
      .from('request')
      .select('*,recruiter_user!request_assignee_id_fkey!inner(*)')
      .eq('id', request_id)
      .single()
  ).data;
  if (!request_rec) {
    throw new CApiError('SERVER_ERROR', 'No request record found');
  }
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
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      show_soft_conflicts: true,
      out_of_working_hrs: true,
    },
    return_empty_slots_err: true,
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }
  await cand_schedule.fetchDetails({
    params: {
      session_ids,
      start_date_str: avail_record.date_range[0],
      end_date_str: avail_record.date_range[1],
      company_id: recruiter_id,
      req_user_tz: request_assignee_tz,
    },
  });

  const cand_picked_slots = await executeWorkflowAction(
    findCandSelectedSlots,
    {
      cand_avail: avail_record.slots,
      reqProgressLogger,
      cand_schedule,
      request_assignee_tz: request_assignee_tz,
    },
    reqProgressLogger,
  );

  if (target_api === 'onReceivingAvailReq_agent_suggestSlots') {
    await executeWorkflowAction(
      slackSuggestSlots,
      {
        avail_plans: cand_picked_slots ?? [],
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
    // await executeWorkflowAction(
    //   candidateSelfSchedule,
    //   {
    //     parsed_body: {
    //       application_id,
    //       event_run_id,
    //       payload,
    //       request_id,
    //       recruiter_id,
    //       session_ids,
    //       target_api,
    //     },
    //     reqProgressLogger,
    //     req_assignee_tz: request_assignee_tz,
    //     organizer_id: organizer_id,
    //     date_range:{},
    //     job_payload:
    //   },
    //   reqProgressLogger,
    // );
  }
};

export default createPageApiPostRoute(null, candAvailRecieved);
