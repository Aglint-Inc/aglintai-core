/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

import { fetchAvailApiDetails } from '@/src/utils/scheduling_v2/db_calls';
import { findEachInterviewerFreeTimes } from '@/src/utils/scheduling_v2/func_1';
import { findPlanCombinations } from '@/src/utils/scheduling_v2/func_4';

type BodyParams = {
  job_id: string;
  company_id: string;
  start_date: string;
  end_date: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { job_id, company_id, start_date, end_date } = req.body as BodyParams;

    const { interview_plan_api, company_cred, interviewers_info } =
      await fetchAvailApiDetails({
        job_id,
        recruiter_id: company_id
      });
    console.timeEnd('fetchAvailApiDetails');

    const inters_with_free_time_ranges = await findEachInterviewerFreeTimes(
      company_cred,
      interviewers_info,
      start_date,
      end_date
    );

    const combs = findPlanCombinations(
      interview_plan_api,
      inters_with_free_time_ranges
    );

    res.status(200).json(combs);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error.message);
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//
