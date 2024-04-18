/* eslint-disable no-console */
import dayjs from 'dayjs';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

export type BodyParams = {
  session_ids: string[];
  plan_id: string;
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
  is_debreif: boolean;
};

const required_fields = ['recruiter_id', 'start_date', 'end_date'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {
      session_ids,
      recruiter_id,
      start_date,
      end_date,
      user_tz,
      is_debreif = false,
    } = req.body as BodyParams;

    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const start_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      start_date,
      user_tz,
      true,
    );
    const end_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      end_date,
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
        end_date_js: end_date_js,
        start_date_js: start_date_js,
      },
    );

    await cand_schedule.fetchDetails();
    await cand_schedule.fetchInterviewrsCalEvents();
    const combs = cand_schedule.findMultiDayComb();

    return res.status(200).json({
      plan_combs: is_debreif ? combs : combs.slice(0, 20),
      total: combs.length,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
