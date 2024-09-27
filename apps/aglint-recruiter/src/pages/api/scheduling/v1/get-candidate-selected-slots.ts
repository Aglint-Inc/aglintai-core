import { schema_verify_interviewer_selected_slots } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { fetchCandidateAvailability } from '@/services/CandidateScheduleV2/utils/fetchCandidateAvailability';

const getCandidateSelectedSlots = async (
  parsedData: z.infer<typeof schema_verify_interviewer_selected_slots>,
) => {
  const {
    api_options,
    session_ids,
    candidate_selected_slots,
    start_date_str,
    end_date_str,
    recruiter_id,
  } = await fetchCandidateAvailability(parsedData.cand_availability_id);
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    params: {
      company_id: recruiter_id,
      session_ids: session_ids,
      req_user_tz: parsedData.user_tz,
      start_date_str: start_date_str,
      end_date_str: end_date_str,
    },
  });
  const all_combs = cand_schedule.getCandidateSelectedSlots(
    candidate_selected_slots,
  );

  return {
    slots: all_combs,
    availabilities: cand_schedule.calendar_events,
  };
};

export default createPageApiPostRoute(
  schema_verify_interviewer_selected_slots,
  getCandidateSelectedSlots,
);
