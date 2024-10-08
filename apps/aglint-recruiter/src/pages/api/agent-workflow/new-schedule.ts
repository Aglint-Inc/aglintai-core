import {
  type ActionPayloadType,
  type DatabaseEnums,
  type DatabaseTable,
} from '@aglint/shared-types';
import {
  candidate_new_schedule_schema,
  CApiError,
  createRequestProgressLogger,
  dayjsLocal,
  executeWorkflowAction,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import { apiTargetToEvents } from '@request/components/RequestProgress/utils/progressMaps';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { candidateAvailRequest } from '@/services/api-schedulings/avail-recieved/candidateAvailRequest';
import { candidateAvailReRequest } from '@/services/api-schedulings/avail-recieved/candidateAvailReRequest';
import { sendSelfScheduleLink } from '@/services/api-schedulings/new-schedule/sendSelfScheduleLink';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schedule_wf = async (req_body: any) => {
  const supabaseAdmin = getSupabaseServer();

  const {
    parsed_body,
    api_target,
    date_range,
    meeting_details,
    organizer_id,
    request_assignee_tz,
    job_payload,
  } = await fetchUtil(req_body);
  const target_api = parsed_body.target_api as keyof typeof apiTargetToEvents;
  const eventAction = apiTargetToEvents[target_api];
  if (!eventAction) {
    throw new CApiError('SERVER_ERROR', 'eventAction not found');
  }

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: parsed_body.request_id,
    supabaseAdmin,
    event_run_id: parsed_body.event_run_id,
    event_type: eventAction,
  });
  await reqProgressLogger.resetEventProgress();

  let meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'] =
    'self_scheduling';

  // fix lint
  if (api_target === 'onRequestSchedule_emailLink_sendSelfSchedulingLink') {
    meeting_flow = 'self_scheduling';
    await executeWorkflowAction(
      sendSelfScheduleLink,
      {
        agent_instruction: job_payload.agent.instruction,
        parsed_body,
        date_range: {
          start_date_str: date_range.start_date_str,
          end_date_str: date_range.end_date_str,
        },
        job_payload,
        reqProgressLogger,
        recruiter_id: parsed_body.recruiter_id,
        session_ids: parsed_body.session_ids,
        time_zone: request_assignee_tz,
      },
      reqProgressLogger,
    );
  } else if (
    api_target === 'onRequestSchedule_emailLink_getCandidateAvailability'
  ) {
    await executeWorkflowAction(
      candidateAvailRequest,
      {
        req_body: req_body,
        cloned_sessn_ids: parsed_body.session_ids,
        start_date_str: date_range.start_date_str,
        end_date_str: date_range.end_date_str,
        organizer_id: organizer_id,
        request_id: parsed_body.request_id,
        reqProgressLogger,
        mail_payload: req_body.payload?.email,
      },
      reqProgressLogger,
    );
  } else if (
    api_target === 'onRequestReschedule_emailLink_resendAvailRequest'
  ) {
    await executeWorkflowAction(
      candidateAvailReRequest,
      {
        req_body: req_body,
        cloned_sessn_ids: parsed_body.session_ids,
        start_date_str: date_range.start_date_str,
        end_date_str: date_range.end_date_str,
        organizer_id: organizer_id,
        request_id: parsed_body.request_id,
      },
      reqProgressLogger,
    );
    meeting_flow = 'candidate_request';
  } else {
    throw new CApiError('SERVER_ERROR', 'new-schedule not found');
  }

  // update meeting details
  supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .update({
        meeting_flow,
        status: 'waiting',
        organizer_id,
        schedule_request_id: parsed_body.request_id,
      })
      .in(
        'id',
        meeting_details.map((m) => m.id),
      ),
  );

  return 'ok';
};

const handler = createPageApiPostRoute(null, schedule_wf);

export default handler;

const fetchUtil = async (req_body: any) => {
  const supabaseAdmin = getSupabaseServer();

  const parsed_body = candidate_new_schedule_schema.parse(req_body);
  const request_rec = (
    await supabaseAdmin
      .from('request')
      .select('*,recruiter_user!request_assignee_id_fkey!inner(*)')
      .eq('id', parsed_body.request_id)
      .single()
      .throwOnError()
  ).data;
  if (!request_rec) {
    throw new CApiError('SERVER_ERROR', 'invalid request id');
  }
  const request_assignee_tz =
    request_rec.recruiter_user.scheduling_settings.timeZone.tzCode;
  const date_range = {
    start_date_str: dayjsLocal().format('DD/MM/YYYY'),
    end_date_str: dayjsLocal().add(7, 'day').format('DD/MM/YYYY'),
  };
  if (request_rec.schedule_start_date && request_rec.schedule_end_date) {
    date_range.start_date_str = dayjsLocal(request_rec.schedule_start_date)
      .tz(request_assignee_tz)
      .format('DD/MM/YYYY');
    date_range.end_date_str = dayjsLocal(request_rec.schedule_end_date)
      .tz(request_assignee_tz)
      .format('DD/MM/YYYY');
  }
  const api_target =
    parsed_body.target_api as DatabaseEnums['email_slack_types'];
  const organizer_id = request_rec.assignee_id;
  const meeting_details = (
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .in('session_id', parsed_body.session_ids)
      .throwOnError()
  ).data;
  if (!meeting_details) {
    throw new CApiError('SERVER_ERROR', 'invalid session id');
  }
  const job_payload =
    req_body.payload as ActionPayloadType['agent_instruction'];
  return {
    parsed_body,
    date_range,
    api_target,
    organizer_id,
    meeting_details,
    request_assignee_tz,
    job_payload,
  };
};
