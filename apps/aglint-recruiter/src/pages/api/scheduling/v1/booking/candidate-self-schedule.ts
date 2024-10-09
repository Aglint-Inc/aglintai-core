/* eslint-disable security/detect-object-injection */
import { SchemaCandidateDirectBooking } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import { CApiError } from '@aglint/shared-utils/src/customApiError';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { verifyRecruiterSelectedSlots } from '@/services/CandidateSchedule/utils/bookingUtils/verifyRecruiterSelctedOptions';

const candidateSelfSchedule = async (
  parsed: z.infer<typeof SchemaCandidateDirectBooking>,
) => {
  const fetchedDetails = await fetchDBScheduleDetails(parsed.filter_id);
  const { verified_slots, cand_schedule } = await verifyRecruiterSelectedSlots({
    candidate_tz: parsed.cand_tz,
    company_id: fetchedDetails.company.id,
    selected_options: fetchedDetails.selected_plans,
    session_ids: fetchedDetails.session_ids,
  });

  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }
  await bookCandidateSelectedOption(
    parsed,
    cand_schedule.db_details,
    verified_slots[0],
    fetchedDetails,
  );
};

export default createPageApiPostRoute(
  SchemaCandidateDirectBooking,
  candidateSelfSchedule,
);
