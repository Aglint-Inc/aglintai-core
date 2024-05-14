/* eslint-disable no-console */
import dayjs from 'dayjs';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { APIFindSlotsDateRange } from '@aglint/shared-types';

const required_fields = ['recruiter_id', 'date_range_start', 'date_range_end'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      session_ids,
      recruiter_id,
      date_range_start,
      date_range_end,
      user_tz,
    } = req.body as APIFindSlotsDateRange;

    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const start_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      date_range_start,
      user_tz,
      true,
    );
    const end_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      date_range_end,
      user_tz,
      false,
    );

    const cand_schedule = new CandidatesScheduling(
      {
        company_id: recruiter_id,
        session_ids,
        user_tz,
      },
      {
        start_date_js: start_date_js,
        end_date_js: end_date_js,
      },
    );

    await cand_schedule.fetchDetails();
    await cand_schedule.fetchInterviewrsCalEvents();
    const all_day_plans = cand_schedule.findCandSlotsForDateRange();

    return res.status(200).json(all_day_plans);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

// given n persons with there availability time_ranges in the format {startTime:string, endTime:string}[] for each person find the commn  time range which all n person are available on that
//
