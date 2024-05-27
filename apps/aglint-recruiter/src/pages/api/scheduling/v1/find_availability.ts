/* eslint-disable no-console */
import dayjs from 'dayjs';

import { schema_find_availability_payload } from '@/src/types/scheduling/schema_find_availability_payload';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Parse request body
    // TODO: find better solution for this
    const parsedData = schema_find_availability_payload.parse({
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });

    const start_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      parsedData.start_date,
      parsedData.candidate_tz,
      true,
    );
    const end_date_js = CandidatesScheduling.convertDateFormatToDayjs(
      end_date,
      user_tz,
      false,
    );

    // const cand_schedule = new CandidatesScheduling(
    //   {
    //     company_id: recruiter_id,
    //     session_ids,
    //     user_tz,
    //   },
    //   {
    //     end_date_js: end_date_js,
    //     start_date_js: start_date_js,
    //   },
    // );

    // await cand_schedule.fetchDetails();
    // await cand_schedule.fetchInterviewrsCalEvents();
    // const combs = cand_schedule.findMultiDayComb();

    // return res.status(200).json({
    //   plan_combs: is_debreif ? combs : combs.slice(0, 20),
    //   total: combs.length,
    // });
    return res.status(200).send(parsedData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

export default handler;
