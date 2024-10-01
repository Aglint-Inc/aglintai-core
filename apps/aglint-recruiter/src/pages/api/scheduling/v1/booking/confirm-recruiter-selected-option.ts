/* eslint-disable security/detect-object-injection */
import { type APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

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
      start_date_str: fetched_details.date.start_date_str,
      end_date_str: fetched_details.date.end_date_str,
      company_id: fetched_details.company.id,
      session_ids: req_body.selectedOption.sessions.map((s) => s.session_id),
    },
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }

  const verified_plans = cand_schedule.verifyIntSelectedSlots([
    req_body.selectedOption,
  ]);
  if (verified_plans.length === 0) {
    throw new Error('Requested plan does not exist');
  }
  await bookRecruiterSelectedOption(
    req_body,
    cand_schedule.db_details,
    verified_plans[0],
    fetched_details,
  );
};

export default createPageApiPostRoute(null, confirmRecruiterSelectedOptions);
