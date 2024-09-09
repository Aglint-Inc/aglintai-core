import { type DatabaseEnums } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { apiTargetToEvents } from '@/components/Requests/_common/components/RequestCard/RequestDetails/RequestProgress/utils/progressMaps';
import { candidateSelfSchedule } from '@/services/api-schedulings/candidateSelfSchedule';
import { confirmSlotFromCandidateAvailability } from '@/services/api-schedulings/confirmSlotFromCandidateAvailability';
import { findCandSelectedSlots } from '@/services/api-schedulings/findCandSelectedSlots';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getOrganizerId } from '@/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

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
  try {
    const event = apiTargetToEvents[target_api];
    const reqProgressLogger = createRequestProgressLogger({
      request_id,
      event_run_id,
      supabaseAdmin,
      event_type: event,
    });
    await reqProgressLogger.resetEventProgress();

    const [request_rec] = supabaseWrap(
      await supabaseAdmin
        .from('request')
        .select('*,recruiter_user!request_assignee_id_fkey(*)')
        .eq('id', request_id),
    );
    const request_assignee_tz =
      request_rec.recruiter_user.scheduling_settings.timeZone.tzCode;
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
    const session_ids = meeting_details.map((m) => m.session_id);
    const organizer_id = await getOrganizerId(application_id, supabaseAdmin);

    const cand_schedule = new CandidatesSchedulingV2({
      include_conflicting_slots: {
        show_soft_conflicts: true,
        out_of_working_hrs: true,
      },
      return_empty_slots_err: true,
    });

    await cand_schedule.fetchDetails({
      session_ids,
      start_date_str: avail_record.date_range[0],
      end_date_str: avail_record.date_range[1],
      company_id: recruiter_id,
      req_user_tz: request_assignee_tz,
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

    if (target_api === 'onReceivingAvailReq_agent_confirmSlot') {
      await executeWorkflowAction(
        confirmSlotFromCandidateAvailability,
        {
          avail_plans: cand_picked_slots,
          cand_avail_rec: avail_record,
          cand_schedule: cand_schedule,
          reqProgressLogger,
        },
        reqProgressLogger,
      );
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
          mail_payload: payload?.email,
        },
        reqProgressLogger,
      );
    }
    return res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export default handler;
