/* eslint-disable security/detect-object-injection */
import { type APIScheduleDebreif } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { bookRecruiterSelectedDebreif } from '@/services/CandidateSchedule/utils/bookingUtils/bookRecruiterSelectedDebreif';
import { fetchCandDetailsForDebreifBooking } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchCandDetailsForDebreifBooking';

const scheduleDebrief = async (req_body: APIScheduleDebreif) => {
  const body = req_body;
  const fetched_details = await fetchCandDetailsForDebreifBooking(body);
  const cand_schedule = new CandidatesScheduling(fetched_details.api_options);
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: body.user_tz,
      start_date_str: fetched_details.dates.start_date_str,
      end_date_str: fetched_details.dates.end_date_str,
      company_id: fetched_details.company.id,
      session_ids: body.selectedOption.sessions.map((s) => s.session_id),
    },
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }
  const verified_plans = cand_schedule.verifyIntSelectedSlots([
    body.selectedOption,
  ]);
  if (verified_plans.length === 0) {
    throw new Error('Requested plan does not exist');
  }
  await bookRecruiterSelectedDebreif(
    body,
    cand_schedule.db_details,
    verified_plans[0],
    fetched_details,
  );
};

export default createPageApiPostRoute(null, scheduleDebrief);
