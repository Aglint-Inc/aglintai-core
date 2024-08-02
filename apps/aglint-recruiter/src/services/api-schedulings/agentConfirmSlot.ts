import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';

export const selfScheduleAgent = async (req_body) => {
  const { candidate_availability_request_id, recruiter_id } = req_body;

  const cand_schedule = new CandidatesSchedulingV2({});
  await cand_schedule.fetchDetails({
    session_ids: avail_record.request_session_relation.map((s) => s.session_id),
    start_date_str: avail_record.date_range[0],
    end_date_str: avail_record.date_range[1],
    company_id: recruiter_id,
    req_user_tz: 'Asia/Colombo',
  });
};
