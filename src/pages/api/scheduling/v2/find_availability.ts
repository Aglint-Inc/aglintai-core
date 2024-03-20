/* eslint-disable no-console */
import dayjs, { Dayjs } from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAvailApiDetails } from '@/src/utils/scheduling_v2/db_calls';
import { findEachInterviewerFreeTimes } from '@/src/utils/scheduling_v2/findEachInterviewerFreeTimes';
import { findPlanCombinations } from '@/src/utils/scheduling_v2/findPlanCombinations';

export type BodyParams = {
  job_id: string;
  company_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      job_id,
      company_id,
      start_date,
      end_date,
      user_tz = 'Asia/Colombo',
    } = req.body as BodyParams;

    start_date = getUserTimeZoneDate(start_date, user_tz, true);
    end_date = getUserTimeZoneDate(end_date, user_tz, false);

    const { interview_plan_api, company_cred, interviewers_info } =
      await fetchAvailApiDetails({
        job_id,
        recruiter_id: company_id,
      });

    const inters_with_free_time_ranges = await findEachInterviewerFreeTimes(
      company_cred,
      interviewers_info,
      start_date,
      end_date,
    );

    const combs = findPlanCombinations(
      interview_plan_api,
      inters_with_free_time_ranges,
    );
    return res.status(200).json(combs);

    // const common_free_time = findCommonTimeRange(
    //   inters_with_free_time_ranges.map((i) => ({
    //     inter_id: i.interviewer_id,
    //     time_ranges: i.freeTimes,
    //     interviewer_pause: null,
    //   })),
    // );

    // return res
    //   .status(200)
    //   .json({ d1: inters_with_free_time_ranges, d2: common_free_time });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//

const getUserTimeZoneDate = (user_date, userTimeZone, isStartTime = true) => {
  const [day, month, year] = user_date.split('/');
  const d1 = dayjs(`${year}-${month}-${day}`);
  // if (!validate(user_date, 'DD/MM/YYYY'))
  //   throw new Error(`invalid date format ${user_date}`);

  let d: Dayjs;
  d = d1.tz(userTimeZone);
  if (isStartTime) {
    d = d.startOf('day');
  } else {
    d = d.endOf('day');
  }
  return d.format();
};

// function validate(date, format) {
//   return dayjs(date, format).format(format) === date;
// }
