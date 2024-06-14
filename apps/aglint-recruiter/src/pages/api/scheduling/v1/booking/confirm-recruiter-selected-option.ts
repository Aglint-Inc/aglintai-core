/* eslint-disable security/detect-object-injection */
import { APIConfirmRecruiterSelectedOption } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { bookRecruiterSelectedOption } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/bookRecruiterSelectedOption';
import { fetchCandAvailForBooking } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchCandidateAvailability';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as APIConfirmRecruiterSelectedOption;
    const fetched_details = await fetchCandAvailForBooking(body);

    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: body.user_tz,
        start_date_str: fetched_details.start_date_str,
        end_date_str: fetched_details.end_date_str,
        recruiter_id: fetched_details.recruiter_id,
        session_ids: body.selectedOption.sessions.map((s) => s.session_id),
      },
      fetched_details.zod_options,
    );

    await cand_schedule.fetchDetails();

    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const verified_plans = cand_schedule.verifyIntSelectedSlots([
      body.selectedOption,
    ]);
    if (verified_plans.length === 0) {
      throw new Error('Requested plan does not exist');
    }
    await bookRecruiterSelectedOption(
      body,
      cand_schedule,
      verified_plans[0],
      fetched_details,
    );

    return res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};
export default handler;
