/* eslint-disable no-console */
import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { getFullName } from '@/src/utils/jsonResume';
import { find_api_details } from '@/src/utils/scheduling_v1/find_details';
import { findInterviewersEvents } from '@/src/utils/scheduling_v2/findEachInterviewerFreeTimes';
import { findMultiDayComb } from '@/src/utils/scheduling_v2/findPlanCombinations';
import { convertDateFormatToDayjs } from '@/src/utils/scheduling_v2/utils';

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
      user_tz = 'Asia/colombo',
      is_debreif = false,
    } = req.body as BodyParams;

    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const dayjs_start_date = convertDateFormatToDayjs(start_date);
    const dayjs_end_date = convertDateFormatToDayjs(end_date);

    const { company_cred, all_inters, ses_with_ints, comp_schedule_setting } =
      await find_api_details(session_ids, recruiter_id);

    const intervs_details_with_events = await findInterviewersEvents(
      company_cred,
      all_inters.map((i) => ({
        email: i.email,
        interviewer_id: i.user_id,
        name: getFullName(i.first_name, i.last_name),
        profile_img: i.profile_image,
        shedule_settings: i.scheduling_settings,
        tokens: i.schedule_auth as any,
      })),
      dayjs_start_date,
      dayjs_end_date,
      user_tz,
    );

    const combs = findMultiDayComb(
      ses_with_ints,
      intervs_details_with_events,
      dayjs_start_date,
      dayjs_end_date,
      user_tz,
      comp_schedule_setting,
    );
    return res.status(200).json({
      plan_combs: is_debreif ? combs : combs.slice(0, 20),
      total: combs.length,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
