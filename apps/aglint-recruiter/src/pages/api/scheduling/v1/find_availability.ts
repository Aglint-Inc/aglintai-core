/* eslint-disable no-console */
import { schema_find_availability_payload } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_find_availability_payload, {
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
        start_date_str: parsedData.start_date_str,
        end_date_str: parsedData.end_date_str,
      },
      parsedData.options,
    );

    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const slots = cand_schedule.findAvailabilitySlotsDateRange();
    // const combs = ScheduleUtils.createCombsForMultiDaySlots(slots);
    return res.status(200).json(slots);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
