/* eslint-disable no-console */
import dayjs from 'dayjs';
import { has } from 'lodash';

import {
  bookCandidatePlan,
  saveEventsStatusInSchedule,
} from '@/src/utils/event_book/book_day_plan';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';

export type ConfirmApiBodyParams = {
  candidate_plan: {
    sessions: {
      session_id: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
  recruiter_id: string;
  user_tz: string;
  candidate_email: string;
  schedule_id: string;
};

const required_fields = [
  'candidate_plan',
  'recruiter_id',
  'user_tz',
  'candidate_email',
  'schedule_id',
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body as ConfirmApiBodyParams;
  try {
    required_fields.forEach((field) => {
      if (!has(req_body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });
    await bookCandidatePlan(req_body);
    await saveEventsStatusInSchedule({
      api_status: 'sucess',
      schedule_id: req_body.schedule_id,
    });
    return res.status(200).json('sucess');
  } catch (error) {
    console.log(error);
    await saveEventsStatusInSchedule({
      api_status: 'failed',
      schedule_id: req_body.schedule_id,
      error_msg: error.message,
    });
    return res.status(500).send(error.message);
  }
};

export default handler;

// how many slots exist for for the candidate requested time
