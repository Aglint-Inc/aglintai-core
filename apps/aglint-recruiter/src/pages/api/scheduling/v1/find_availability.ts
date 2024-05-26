/* eslint-disable no-console */
import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { schema_find_availability_payload } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('nfkewj');
    const s = schema_find_availability_payload.parse(req.body);
    console.log('paylof', s);

    // required_fields.forEach((field) => {
    //   if (!has(req.body, field)) {
    //     throw new Error(`missing Field ${field}`);
    //   }
    // });

    // const start_date_js = CandidatesScheduling.convertDateFormatToDayjs(
    //   start_date,
    //   user_tz,
    //   true,
    // );
    // const end_date_js = CandidatesScheduling.convertDateFormatToDayjs(
    //   end_date,
    //   user_tz,
    //   false,
    // );

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
    return res.status(200).send('');
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

export default handler;
