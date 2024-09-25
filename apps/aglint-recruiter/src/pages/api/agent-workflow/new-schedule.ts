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
import { apiTargetToEvents } from '@requests/components/RequestProgress/utils/progressMaps';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { candidateAvailRequest } from '@/services/api-schedulings/candidateAvailRequest';
import { candidateAvailReRequest } from '@/services/api-schedulings/candidateAvailReRequest';
import { candidateSelfSchedule } from '@/services/api-schedulings/candidateSelfSchedule';
import { getOrganizerId } from '@/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';
const schedule_wf = async (req_body) => {
  const {
    parsed_body,
    api_target,
    date_range,
    meeting_details,
    organizer_id,
    request_assignee_tz,
    job_payload,
  } = await fetchUtil(req_body);
  const event_log_id = uuidv4();
  const eventAction = apiTargetToEvents[parsed_body.target_api];

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
      candidateSelfSchedule,
      {
        parsed_body,
        date_range,
        reqProgressLogger,
        job_payload,
        req_assignee_tz: request_assignee_tz,
        organizer_id,
      },
      reqProgressLogger,
      event_log_id,
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
  const parsed_body = v.parse(candidate_new_schedule_schema, req_body);
  const [request_rec] = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,recruiter_user!request_assignee_id_fkey(*)')
      .eq('id', parsed_body.request_id),
  );
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
  const organizer_id = await getOrganizerId(
    parsed_body.application_id,
    supabaseAdmin,
  );
  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .in('session_id', parsed_body.session_ids),
  );
  if (meeting_details.length === 0) {
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
