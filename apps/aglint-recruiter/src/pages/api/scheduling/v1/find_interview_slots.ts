/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { schema_find_interview_slot } from '@/src/types/scheduling/schema_find_availability_payload';
import { combineSlots } from '@/src/utils/scheduling_v2/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = schema_find_interview_slot.parse({
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
        start_date_str: parsedData.schedule_date,
        end_date_str: parsedData.schedule_date,
      },
      parsedData.options,
    );

    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const plan_combs = cand_schedule.findCandSlotForTheDay();

    const session_combs = combineSlots(plan_combs);
    return res.status(200).json(session_combs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
