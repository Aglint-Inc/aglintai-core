import { schema_verify_interviewer_selected_slots } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { fetchCandidateAvailability } from '@/src/services/CandidateScheduleV2/utils/fetchCandidateAvailability';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_verify_interviewer_selected_slots, {
      ...req.body,
    });
    const {
      api_options,
      session_ids,
      candidate_selected_slots,
      start_date_str,
      end_date_str,
      recruiter_id,
    } = await fetchCandidateAvailability(parsedData.cand_availability_id);
    const cand_schedule = new CandidatesSchedulingV2(
      {
        recruiter_id: recruiter_id,
        session_ids: session_ids,
        candidate_tz: parsedData.user_tz,
        start_date_str: start_date_str,
        end_date_str: end_date_str,
      },
      api_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const all_combs = cand_schedule.getCandidateSelectedSlots(
      candidate_selected_slots,
    );

    return res.status(200).send(all_combs);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).send(err.message);
  }
};

export default handler;
