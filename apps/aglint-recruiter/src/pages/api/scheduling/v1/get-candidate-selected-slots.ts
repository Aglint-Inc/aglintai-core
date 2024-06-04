import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { fetchCandidateAvailability } from '@/src/services/CandidateScheduleV2/utils/fetchCandidateAvailability';
import { schema_verify_interviewer_selected_slots } from '@/src/types/scheduling/schema_find_availability_payload';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = schema_verify_interviewer_selected_slots.parse({
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    const cand_schedule = new CandidatesSchedulingV2(
      {
        recruiter_id: parsedData.recruiter_id,
        session_ids: parsedData.session_ids,
        candidate_tz: parsedData.candidate_tz,
        start_date_str: parsedData.date_range_start,
        end_date_str: parsedData.date_range_end,
      },
      parsedData.options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const cand_selected_slots = await fetchCandidateAvailability(
      parsedData.cand_availability_id,
    );
    const all_combs =
      cand_schedule.getCandidateSelectedSlots(cand_selected_slots);
    return res.status(200).send(all_combs);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).send(err.message);
  }
};

export default handler;
