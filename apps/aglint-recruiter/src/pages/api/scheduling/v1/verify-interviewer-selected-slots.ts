import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { schema_verify_interviewer_selected_slots } from '@/src/types/scheduling/schema_find_availability_payload';

export type APIVerifyInterviewerSelectedSlot = {
  //
};

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
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export default handler;
