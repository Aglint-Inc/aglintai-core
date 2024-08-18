/* eslint-disable no-unused-vars */
import { SessionCombinationRespType } from '@aglint/shared-types';
import {
  schema_find_alternative_slots,
  supabaseWrap,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

//ignore current interviewer

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed_body = v.parse(schema_find_alternative_slots, {
      ...req.body,
    });
    const [meeting_detail] = supabaseWrap(
      await supabaseAdmin
        .from('meeting_details')
        .select()
        .eq('session_id', parsed_body.session_id),
    );
    const meeting_ints = supabaseWrap(
      await supabaseAdmin
        .from('meeting_interviewers')
        .select()
        .eq('session_id', parsed_body.session_id),
    );
    const [module_rec] = supabaseWrap(
      await supabaseAdmin
        .from('interview_module')
        .select()
        .eq('id', meeting_detail.module_id),
    );
    const cand_schedule = new CandidatesSchedulingV2({
      return_empty_slots_err: true,
      include_conflicting_slots: {
        day_off: true,
        holiday: true,
        interviewer_pause: true,
        interviewers_load: true,
        out_of_office: true,
        out_of_working_hrs: true,
        show_soft_conflicts: true,
        show_conflicts_events: true,
        calender_not_connected: true,
      },
    });
    await cand_schedule.fetchDetails({
      company_id: module_rec.recruiter_id,
      session_ids: [parsed_body.session_id],
      req_user_tz: parsed_body.user_tz,
      end_date_str: userTzDayjs(meeting_detail.start_time)
        .tz(parsed_body.user_tz)
        .format('DD/MM/YYYY'),
      start_date_str: userTzDayjs(meeting_detail.start_time)
        .tz(parsed_body.user_tz)
        .format('DD/MM/YYYY'),
    });
    const all_ignored_ints = [
      ...meeting_ints
        .filter((i) => i.is_confirmed)
        .map((i) => i.session_relation_id),
      ...parsed_body.ignore_int_session_ids,
    ];
    cand_schedule.ignoreTrainee();
    cand_schedule.ignoreInterviewers(all_ignored_ints);

    const [single_day_slots] = cand_schedule.findCandSlotForTheDay();
    if (!single_day_slots) {
      return res.status(200).json([]);
    }
    const slot_combs = single_day_slots.plans.map((comb) => comb.sessions[0]);
    const time_filtered_slots = slot_combs.filter((comb) =>
      filter_slots(comb, meeting_detail.start_time, parsed_body.user_tz),
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
