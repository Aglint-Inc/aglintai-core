/* eslint-disable no-console */
import dayjs from 'dayjs';

import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = schema_find_availability_payload.parse({
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
        start_date_str: parsedData.start_date,
        end_date_str: parsedData.end_date,
      },
      parsedData.options,
    );

    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const combs = cand_schedule.findMultiDayComb();

    return res.status(200).json({
      plan_combs: combs.slice(0, 20),
      total: combs.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
