/* eslint-disable no-console */
import dayjs, { Dayjs } from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { getFullName } from '@/src/utils/jsonResume';
import { find_api_details } from '@/src/utils/scheduling_v1/find_details';
import { findEachInterviewerFreeTimes } from '@/src/utils/scheduling_v2/findEachInterviewerFreeTimes';
import { findPlanCombinations } from '@/src/utils/scheduling_v2/findPlanCombinations';

export type BodyParams = {
  session_ids: string[];
  plan_id: string;
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
};

const required_fields = ['recruiter_id', 'start_date', 'end_date'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      session_ids,
      recruiter_id,
      start_date,
      end_date,
      user_tz = 'Asia/Colombo',
    } = req.body as BodyParams;

    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    start_date = getUserTimeZoneDate(start_date, user_tz, true);
    end_date = getUserTimeZoneDate(end_date, user_tz, false);

    const { ses_with_ints, company_cred, all_inters } = await find_api_details(
      session_ids,
      recruiter_id,
    );

    const selected_sessions = ses_with_ints.filter((s) =>
      session_ids.includes(s.session_id),
    );
    const inters_with_free_time_ranges = await findEachInterviewerFreeTimes(
      company_cred,
      all_inters.map((i) => ({
        email: i.email,
        interviewer_id: i.user_id,
        name: getFullName(i.first_name, i.last_name),
        profile_img: i.profile_image,
        shedule_settings: i.scheduling_settings,
        tokens: i.schedule_auth as any,
      })),
      start_date,
      end_date,
    );
    const combs = findPlanCombinations(
      selected_sessions,
      inters_with_free_time_ranges,
    );
    return res.status(200).json(combs);

    // return res
    //   .status(200)
    //   .json({ d1: inters_with_free_time_ranges, d2: common_free_time });
    // return res.status(200).send(inters_with_free_time_ranges);
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
  if (!day || !month || !year) {
    throw new Error(`Date should in the format DD/MM/YYYY`);
  }
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
