import { DatabaseEnums } from '@aglint/shared-types';
import { addErrorHandlerWrap, supabaseWrap } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { sendSelfSchedulingLinkFunc } from '@/src/services/api-schedulings/sendSelfSchedulingLink';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getClonedSessionIds } from '@/src/utils/scheduling/getClonedSessionIds';
import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  const { candidate_availability_request_id, recruiter_id, application_id } =
    req.body;
  const [avail_record] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select('*,request_session_relation(*)')
      .eq('id', candidate_availability_request_id),
  );

  const organizer_id = await getOrganizerId(application_id, supabaseAdmin);
  const { cloned_sessn_data, schedule_id } = await getClonedSessionIds(
    application_id,
    avail_record.request_session_relation.map((s) => s.session_id),
  );

  let cloned_sessn_ids = cloned_sessn_data.map((s) => s.id);

  const cand_schedule = new CandidatesSchedulingV2({});
  await cand_schedule.fetchDetails({
    session_ids: cloned_sessn_ids,
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
    await sendSelfSchedulingLinkFunc(
      cand_picked_slots,
      schedule_id,
      organizer_id,
      avail_record.date_range[0],
      avail_record.date_range[1],
      cloned_sessn_ids,
    );
  }
  return res.status(200).end();
};

export default addErrorHandlerWrap(handler);
