/* eslint-disable no-console */
import { schema_find_interview_slot } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { combineSlots } from '@/src/utils/scheduling_v2/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_find_interview_slot, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    const cand_schedule = new CandidatesSchedulingV2(parsedData.options);

    await cand_schedule.fetchDetails({
      company_id: parsedData.recruiter_id,
      session_ids: parsedData.session_ids,
      req_user_tz: parsedData.candidate_tz,
      start_date_str: parsedData.schedule_date,
      end_date_str: parsedData.schedule_date,
    });
    const plan_combs = cand_schedule.findCandSlotForTheDay();

    const session_combs = combineSlots(plan_combs);
    return res.status(200).json(session_combs);
  } catch (error) {
    console.log(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;
