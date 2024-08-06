import { APIOptions, DatabaseTable } from '@aglint/shared-types';

import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';

export const findCandSelectedSlots = async ({
  api_options,
  company_id,
  end_date_str,
  req_user_tz,
  session_ids,
  start_date_str,
  cand_avail,
}: {
  api_options: APIOptions;
  session_ids: string[];
  end_date_str: string;
  start_date_str: string;
  company_id: string;
  req_user_tz: string;
  cand_avail: DatabaseTable['candidate_request_availability']['slots'];
}) => {
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    session_ids,
    start_date_str,
    end_date_str,
    company_id,
    req_user_tz,
  });
  const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(cand_avail);
  return cand_picked_slots;
};
