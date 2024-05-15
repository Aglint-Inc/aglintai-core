/* eslint-disable no-console */
import { APIFindInterviewSlot } from '@aglint/shared-types';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
import { combineSlots } from '@/src/utils/scheduling_v2/utils';

const required_fields = ['recruiter_id', 'start_date', 'user_tz'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { session_ids, recruiter_id, start_date, user_tz } =
      req.body as APIFindInterviewSlot;

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
      start_date,
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
    const plan_combs = cand_schedule.findCandSlotForTheDay();

    const session_combs = combineSlots(plan_combs);
    return res.status(200).json(session_combs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
