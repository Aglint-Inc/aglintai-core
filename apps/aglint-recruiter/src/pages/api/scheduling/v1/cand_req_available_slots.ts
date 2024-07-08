/* eslint-disable security/detect-object-injection */
import {
  CandReqAvailableSlots,
  CurrRoundCandidateAvailReq,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  ScheduleUtils,
  scheduling_options_schema,
  schema_candidate_req_availabale_slots,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let parsed_body = v.parse(schema_candidate_req_availabale_slots, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    const fetched_details = await fetchDetails(parsed_body);
    const cand_schedule = new CandidatesSchedulingV2(
      {
        session_ids: fetched_details.avail_req_details.session_ids.map(
          (s) => s.id,
        ),
        start_date_str: fetched_details.avail_req_details.date_range[0],
        end_date_str: fetched_details.avail_req_details.date_range[1],
        recruiter_id: parsed_body.recruiter_id,
        candidate_tz: parsed_body.candidate_tz,
      },
      fetched_details.updated_api_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const all_day_plans = cand_schedule.findAvailabilitySlotsDateRange();
    const curr_round_options = convertToOptionsReqSlot(
      fetched_details,
      parsed_body,
      all_day_plans,
    );
    return res.status(200).send(curr_round_options);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

const fetchDetails = async (payload: CandReqAvailableSlots) => {
  const [avail_req_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select()
      .eq('id', payload.avail_req_id),
  );
  const updated_api_options = v.parse(scheduling_options_schema, {
    options: {
      include_conflicting_slots: {},
    },
  });
  updated_api_options.include_free_time =
    avail_req_details.availability.free_keywords;
  updated_api_options.include_conflicting_slots.day_off = true;
  updated_api_options.include_conflicting_slots.out_of_working_hrs = true;
  updated_api_options.use_recruiting_blocks =
    avail_req_details.availability.recruiting_block_keywords;
  const session_rounds = ScheduleUtils.getSessionRounds(
    avail_req_details.session_ids.map((s, idx) => ({
      ...s,
      session_order: idx,
      break_duration: s.break_duration,
      session_duration: s.session_duration,
    })),
  );
  const curr_round_duration = session_rounds[0].reduce((sum, curr) => {
    return sum + curr.session_duration;
  }, 0);
  return {
    avail_req_details,
    updated_api_options,
    session_rounds,
    curr_round_duration,
  };
};

// Suggest times over free keywords ==> highlight
// Suggest times over recruiting block keywords ==> highlight
// Suggest times over outside work hours ==> show
// show dayoffs times over day offs ==> show

type DayOffOOO = 'ooo' | 'day_off';
const convertToOptionsReqSlot = (
  fetched_details: Awaited<ReturnType<typeof fetchDetails>>,
  payload: CandReqAvailableSlots,
  all_day_plans: PlanCombinationRespType[][][],
) => {
  const curr_round_options: CurrRoundCandidateAvailReq[] = [];

  const convertCurrDaySlotsToOptions = (
    slots: PlanCombinationRespType[],
  ): CurrRoundCandidateAvailReq => {
    const api_options = fetched_details.updated_api_options;
    const curr_day = dayjsLocal(slots[0].sessions[0].start_time)
      .tz(payload.candidate_tz)
      .startOf('date');
    let curr_time = curr_day.set('hour', api_options.cand_start_time);
    let curr_day_end_time = curr_day.set('hour', api_options.cand_end_time);
    const curr_day_options: CurrRoundCandidateAvailReq = {
      curr_interview_day: curr_day.format(),
      slots: [],
    };
    let no_conf_slots_start_time = new Set<string>();
    let conf_slots_start_time = new Map<string, DayOffOOO[]>();
    for (let slot of slots) {
      const day_off_arr: DayOffOOO[] = [];

      const is_conflict_free = slot.sessions.every((s) => !s.is_conflict);
      const is_ooo = slot.sessions.some((s) =>
        s.conflict_types.includes('out_of_working_hours'),
      );
      const is_day_off = slot.sessions.some((s) =>
        s.conflict_types.includes('day_off'),
      );
      if (is_conflict_free) {
        no_conf_slots_start_time.add(slot.sessions[0].start_time);
      }

      if (is_day_off) {
        day_off_arr.push('day_off');
      }
      if (is_ooo) {
        day_off_arr.push('ooo');
      }
      if (day_off_arr.length > 0) {
        conf_slots_start_time.set(slot.sessions[0].start_time, [
          ...day_off_arr,
        ]);
      }
    }
    while (
      curr_time
        .add(fetched_details.curr_round_duration, 'minutes')
        .isSameOrBefore(curr_day_end_time, 'minutes')
    ) {
      const ooo_day_off_option =
        conf_slots_start_time.get(curr_time.format()) ?? [];
      // Dont show options in these cases
      if (
        (!fetched_details.avail_req_details.availability.day_offs &&
          ooo_day_off_option.includes('day_off')) ||
        (!fetched_details.avail_req_details.availability.outside_work_hours &&
          ooo_day_off_option.includes('ooo'))
      ) {
        curr_time = curr_time.add(
          fetched_details.curr_round_duration,
          'minutes',
        );
        continue;
      }
      let is_slot_no_conflict = false;
      if (no_conf_slots_start_time.has(curr_time.format())) {
        is_slot_no_conflict = true;
      }

      curr_day_options.slots.push({
        start_time: curr_time.format(),
        end_time: curr_time
          .add(fetched_details.curr_round_duration, 'minutes')
          .format(),
        is_slot_available: is_slot_no_conflict,
      });

      curr_time = curr_time.add(fetched_details.curr_round_duration, 'minutes');
    }
    return curr_day_options;
  };

  for (let curr_interview_day of all_day_plans) {
    const [curr_round_slots] = curr_interview_day;
    if (curr_round_slots) {
      const req_options = convertCurrDaySlotsToOptions(curr_round_slots);
      curr_round_options.push(req_options);
    }
  }

  return curr_round_options;
};
