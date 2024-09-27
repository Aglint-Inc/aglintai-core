/* eslint-disable security/detect-object-injection */
import { type APIScheduleDebreif } from '@aglint/shared-types';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { bookRecruiterSelectedDebreif } from '@/services/CandidateScheduleV2/utils/bookingUtils/bookRecruiterSelectedDebreif';
import { fetchCandDetailsForDebreifBooking } from '@/services/CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchCandDetailsForDebreifBooking';

const scheduleDebrief = async (req_body: APIScheduleDebreif) => {
  const body = req_body;
  const fetched_details = await fetchCandDetailsForDebreifBooking(body);
  const cand_schedule = new CandidatesSchedulingV2(fetched_details.zod_options);
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: body.user_tz,
      start_date_str: fetched_details.start_date_str,
      end_date_str: fetched_details.end_date_str,
      company_id: fetched_details.company.id,
      session_ids: body.selectedOption.sessions.map((s) => s.session_id),
    },
  });
  const verified_plans = cand_schedule.verifyIntSelectedSlots([
    body.selectedOption,
  ]);
  if (verified_plans.length === 0) {
    throw new Error('Requested plan does not exist');
  }
  await bookRecruiterSelectedDebreif(
    body,
    cand_schedule,
    verified_plans[0],
    fetched_details,
  );
};

export default createPageApiPostRoute(null, scheduleDebrief);
