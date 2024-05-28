/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';

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
    console.time('c1');
    const all_day_plans = cand_schedule.findCandSlotsForDateRange();
    console.timeEnd('c1');

    return res.status(200).json(all_day_plans);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//
