/* eslint-disable security/detect-object-injection */
import { type APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { bookRecruiterSelectedOption } from '@/services/CandidateScheduleV2/utils/bookingUtils/bookRecruiterSelectedOption';
import { fetchCandAvailForBooking } from '@/services/CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchCandidateAvailability';

const confirmRecruiterSelectedOptions = async (
  req_body: APIConfirmRecruiterSelectedOption,
) => {
  const fetched_details = await fetchCandAvailForBooking(req_body);

  const cand_schedule = new CandidatesSchedulingV2(fetched_details.zod_options);

  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: req_body.user_tz,
      start_date_str: fetched_details.start_date_str,
      end_date_str: fetched_details.end_date_str,
      company_id: fetched_details.recruiter_id,
      session_ids: req_body.selectedOption.sessions.map((s) => s.session_id),
    },
  });

  const verified_plans = cand_schedule.verifyIntSelectedSlots([
    req_body.selectedOption,
  ]);
  if (verified_plans.length === 0) {
    throw new Error('Requested plan does not exist');
  }
  await bookRecruiterSelectedOption(
    req_body,
    cand_schedule,
    verified_plans[0],
    fetched_details,
  );
};

export default createPageApiPostRoute(null, confirmRecruiterSelectedOptions);
