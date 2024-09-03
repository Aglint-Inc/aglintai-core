import { type DatabaseEnums } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { apiTargetToEvents } from '@/src/components/Requests/RequestSections/Section/Request/RequestDetails/RequestProgress/utils/progressMaps';
import { candidateSelfSchedule } from '@/src/services/api-schedulings/candidateSelfSchedule';
import { findCandSelectedSlots } from '@/src/services/api-schedulings/findCandSelectedSlots';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  const {
    candidate_availability_request_id,
    recruiter_id,
    application_id,
    request_id,
    event_run_id,
    payload,
  } = req.body;
  const reqProgressLogger = createRequestProgressLogger({
    request_id,
    event_run_id,
    supabaseAdmin,
    event_type: apiTargetToEvents[target_api],
  });
  const [request_rec] = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,recruiter_user!request_assignee_id_fkey(*)')
      .eq('id', request_id),
  );
  let request_assigner_tz =
    request_rec.recruiter_user.scheduling_settings.timeZone.tzCode;
  const ai_response = payload.ai_response;
  const [avail_record] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select('*,request_session_relation(*)')
      .eq('id', candidate_availability_request_id),
  );

  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .in(
        'session_id',
        avail_record.request_session_relation.map((s) => s.session_id),
      ),
  );
  let session_ids = meeting_details.map((m) => m.session_id);
  const organizer_id = await getOrganizerId(application_id, supabaseAdmin);

  const cand_picked_slots = await executeWorkflowAction(
    findCandSelectedSlots,
    {
      api_options: {
        include_conflicting_slots: {
          show_soft_conflicts: true,
          out_of_working_hrs: true,
        },
        return_empty_slots_err: true,
      },
      cand_avail: avail_record.slots,
      company_id: recruiter_id,
      start_date_str: avail_record.date_range[0],
      end_date_str: avail_record.date_range[1],
      req_user_tz: request_assigner_tz,
      session_ids,
      reqProgressLogger,
      ai_response,
      request_assigner_tz,
    },
    reqProgressLogger,
  );

  if (target_api === 'onReceivingAvailReq_agent_confirmSlot') {
    //
  } else if (
    target_api === 'onReceivingAvailReq_agent_sendSelfScheduleRequest'
  ) {
    await executeWorkflowAction(
      candidateSelfSchedule,
      {
        cloned_sessn_ids: session_ids,
        start_date_str: avail_record.date_range[0],
        end_date_str: avail_record.date_range[1],
        organizer_id,
        request_id,
        application_id,
        plans: cand_picked_slots,
        reqProgressLogger,
      },
      reqProgressLogger,
    );
  }
  return res.status(200).end();
};

export default handler;
