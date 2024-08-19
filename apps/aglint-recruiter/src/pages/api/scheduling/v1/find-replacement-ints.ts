/* eslint-disable no-unused-vars */
import {
  APIRespFindReplaceMentInts,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import {
  ApiError,
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
    const current_confirmed_ints = meeting_ints
      .filter((int) => int.is_confirmed)
      .map((int) => int.user_id);
    if (
      !meeting_ints.find(
        (int) =>
          int.is_confirmed &&
          int.session_relation_id === parsed_body.declined_int_sesn_reln_id,
      )
    ) {
      throw new ApiError(
        'SERVER_ERROR',
        `${parsed_body.declined_int_sesn_reln_id} is not confirmed interviwer`,
      );
    }
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
    const all_ignored_ints = [parsed_body.declined_int_sesn_reln_id];
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
    const replacement_ints: APIRespFindReplaceMentInts =
      time_filtered_slots.map((slot) => {
        const replacement_int = slot.qualifiedIntervs.filter(
          (int) => !current_confirmed_ints.includes(int.user_id),
        )[0];

        const int_conflict = slot.ints_conflicts.find(
          (int) => int.interviewer.user_id === replacement_int.user_id,
        );

        return {
          replacement_int,
          conflicts: int_conflict?.conflict_reasons ?? [],
        };
      });
    return res.status(200).json(replacement_ints);
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
