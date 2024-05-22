/* eslint-disable no-unused-vars */
import {
  APIFindAltenativeTimeSlot,
  APIFindAltenativeTimeSlotResponse,
} from '@aglint/shared-types';
import { SessionCombinationRespType } from '@aglint/shared-types';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';

const required_fields = [
  'recruiter_id',
  'session_id',
  'slot_start_time',
  'user_tz',
  'replacement_ints',
];
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      recruiter_id,
      session_id,
      slot_start_time,
      user_tz,
      replacement_ints,
    } = req.body as APIFindAltenativeTimeSlot;
    required_fields.forEach((req_field) => {
      if (!has(req.body, req_field)) {
        return res.status(400).send(`missing field ${req_field}`);
      }
    });
    let slot_ints: APIFindAltenativeTimeSlotResponse = [];
    const slot_date = userTzDayjs(slot_start_time).tz(user_tz);
    const cand_schedule = new CandidatesScheduling(
      {
        company_id: recruiter_id,
        session_ids: [session_id],
        user_tz,
      },
      {
        start_date_js: slot_date.startOf('day'),
        end_date_js: slot_date.endOf('day'),
      },
    );
    await cand_schedule.fetchDetails();
    cand_schedule.ignoreTrainee();
    await cand_schedule.fetchInterviewrsCalEvents();
    replacement_ints.forEach((int_id) => {
      slot_ints.push({
        user_id: int_id,
        is_exist: false,
      });
    });
    const [single_day_slots] = cand_schedule.findCandSlotForTheDay();
    if (!single_day_slots) {
      return res.status(200).json(slot_ints);
    }
    const slot_combs = single_day_slots.map((comb) => comb.sessions[0]);
    const time_filtered_slots = slot_combs.filter((comb) =>
      filter_slots(comb, slot_start_time),
    );

    slot_ints = [];
    replacement_ints.forEach((int_id) => {
      if (
        time_filtered_slots.some((slot) =>
          slot.qualifiedIntervs.find((q) => q.user_id === int_id),
        )
      ) {
        slot_ints.push({
          user_id: int_id,
          is_exist: true,
        });
      } else {
        slot_ints.push({
          user_id: int_id,
          is_exist: false,
        });
      }
    });

    return res.status(200).json(slot_ints);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;

const filter_slots = (
  sess_comb: SessionCombinationRespType,
  slot_time: string,
) => {
  return userTzDayjs(sess_comb.start_time).isSame(slot_time, 'minutes');
};
