/* eslint-disable no-unused-vars */
import { SessionCombinationRespType } from '@aglint/shared-types';
import { schema_find_alternative_slots } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed_body = v.parse(schema_find_alternative_slots, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });

    const cand_schedule = new CandidatesSchedulingV2(parsed_body.api_options);
    await cand_schedule.fetchDetails({
      company_id: parsed_body.recruiter_id,
      session_ids: [parsed_body.session_id],
      req_user_tz: parsed_body.user_tz,
      end_date_str: userTzDayjs(parsed_body.slot_start_time)
        .tz(parsed_body.user_tz)
        .format('DD/MM/YYYY'),
      start_date_str: userTzDayjs(parsed_body.slot_start_time)
        .tz(parsed_body.user_tz)
        .format('DD/MM/YYYY'),
    });
    cand_schedule.ignoreTrainee();

    const [single_day_slots] = cand_schedule.findCandSlotForTheDay();
    if (!single_day_slots) {
      return res.status(200).json([]);
    }
    const slot_combs = single_day_slots.plans.map((comb) => comb.sessions[0]);
    const time_filtered_slots = slot_combs.filter((comb) =>
      filter_slots(comb, parsed_body.slot_start_time, parsed_body.user_tz),
    );

    return res.status(200).json(time_filtered_slots);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

const filter_slots = (
  sess_comb: SessionCombinationRespType,
  slot_time: string,
  tz: string,
) => {
  let slot_time_user_time = userTzDayjs(slot_time).tz(tz).format();
  return slot_time_user_time === sess_comb.start_time;
};
