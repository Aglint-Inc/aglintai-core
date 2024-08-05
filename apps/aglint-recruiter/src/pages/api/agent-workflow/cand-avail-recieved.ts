import { DatabaseEnums } from '@aglint/shared-types';
import {
  addErrorHandlerWrap,
  ApiError,
  supabaseWrap,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { sendSelfSchedulingLinkFunc } from '@/src/services/api-schedulings/sendSelfSchedulingLink';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { createRequestProgressLogger } from '@/src/services/api-schedulings/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  const {
    candidate_availability_request_id,
    recruiter_id,
    application_id,
    request_id,
  } = req.body;
  const req_progress_logger = createRequestProgressLogger(request_id);

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
  let schedule_id = meeting_details[0].interview_schedule_id;
  if (meeting_details.length === 0) {
    throw new ApiError('SERVER_ERROR', 'invalid session id');
  }

  const organizer_id = await getOrganizerId(application_id, supabaseAdmin);

  const cand_schedule = new CandidatesSchedulingV2({});
  await cand_schedule.fetchDetails({
    session_ids: meeting_details.map((s) => s.session_id),
    start_date_str: avail_record.date_range[0],
    end_date_str: avail_record.date_range[1],
    company_id: recruiter_id,
    req_user_tz: 'Asia/Colombo',
  });
  if (target_api === 'onReceivingAvailReq_agent_confirmSlot') {
    //
  } else if (
    target_api === 'onReceivingAvailReq_agent_sendSelfScheduleRequest'
  ) {
    const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(
      avail_record.slots,
    );
    await req_progress_logger({
      event_type: 'FIND_SUITABLE_SLOTS',
      status: 'completed',
      log_type: 'heading',
    });
    await sendSelfSchedulingLinkFunc(
      cand_picked_slots,
      schedule_id,
      organizer_id,
      avail_record.date_range[0],
      avail_record.date_range[1],
      session_ids,
      request_id,
    );
    await req_progress_logger({
      event_type: 'SELF_SCHEDULE_LINK',
      status: 'completed',
      log_type: 'heading',
    });
  }
  return res.status(200).end();
};

export default addErrorHandlerWrap(handler);
