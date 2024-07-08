/* eslint-disable security/detect-object-injection */
import {
  APIVerifyRecruiterSelectedSlots,
  DateRangePlansType,
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionsCombType,
} from '@aglint/shared-types';
import {
  ScheduleUtils,
  scheduling_options_schema,
  supabaseWrap,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { planCombineSlots } from '@/src/services/CandidateScheduleV2/utils/planCombine';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { api_options, candidate_tz } =
    req.body as APIVerifyRecruiterSelectedSlots;
  try {
    const { filter_json_data, end_date_str, start_date_str } =
      await fetch_details_from_db(req.body);
    const selected_options =
      filter_json_data.selected_options as PlanCombinationRespType[];

    let zod_options = v.parse(scheduling_options_schema, {
      ...api_options,
      include_conflicting_slots: api_options?.include_conflicting_slots || {},
    });

    if (!selected_options || selected_options?.length === 0) {
      zod_options = v.parse(scheduling_options_schema, {
        include_conflicting_slots: {},
      });
    }
    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: candidate_tz,
        end_date_str: end_date_str,
        recruiter_id: filter_json_data.interview_schedule.recruiter_id,
        session_ids: filter_json_data.session_ids,
        start_date_str: start_date_str,
      },
      zod_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    let all_day_plans = [];

    // email agent schedule link
    if (!selected_options) {
      all_day_plans = cand_schedule.findCandSlotsForDateRange();
    } else {
      const verified_slots =
        cand_schedule.verifyIntSelectedSlots(selected_options);
      all_day_plans = convertOptionsToDateRangeSlots(
        verified_slots,
        candidate_tz,
      );
    }

    return res.status(200).json(all_day_plans);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

const fetch_details_from_db = async (
  req_body: APIVerifyRecruiterSelectedSlots,
) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select('*,interview_schedule(recruiter_id)')
      .eq('id', req_body.filter_json_id),
  );
  if (!filter_json_data) throw new Error('invalid filter_json_id');
  let start_date_str = filter_json_data.filter_json.start_date;
  let end_date_str = filter_json_data.filter_json.end_date;
  if (
    filter_json_data.selected_options &&
    filter_json_data.selected_options.length !== 0
  ) {
    const sorted_options = filter_json_data.selected_options.sort(
      (plan1, plan2) =>
        dayjsLocal(plan1.sessions[0].start_time).unix() -
        dayjsLocal(plan2.sessions[0].start_time).unix(),
    );
    start_date_str = dayjsLocal(sorted_options[0].sessions[0].start_time)
      .tz(req_body.candidate_tz)
      .startOf('date')
      .format('DD/MM/YYYY');
    end_date_str = dayjsLocal(
      sorted_options[sorted_options.length - 1].sessions[
        sorted_options[0].sessions.length - 1
      ].end_time,
    )
      .tz(req_body.candidate_tz)
      .endOf('date')
      .format('DD/MM/YYYY');
  }

  return {
    filter_json_data,
    start_date_str,
    end_date_str,
  };
};

const convertOptionsToDateRangeSlots = (
  verified_options: PlanCombinationRespType[],
  candidate_tz: string,
) => {
  let all_day_plans: SessionsCombType[][][] = [];
  const sesn_round_cnt = ScheduleUtils.getSessionRounds(
    verified_options[0].sessions.map((s) => ({
      break_duration: s.break_duration,
      session_duration: s.duration,
      session_order: s.session_order,
    })),
  ).length;
  const slot_map: {
    [int_start_date: string]: PlanCombinationRespType[][];
  } = {};

  for (let slot_option of verified_options) {
    const int_start_date = userTzDayjs(slot_option.sessions[0].start_time)
      .tz(candidate_tz)
      .startOf('day')
      .format();
    if (!slot_map[int_start_date]) {
      slot_map[int_start_date] = new Array(sesn_round_cnt);
    }
    const slot_rounds: SessionCombinationRespType[][] =
      ScheduleUtils.getSessionRounds(
        slot_option.sessions.map((s) => ({
          ...s,
          break_duration: s.break_duration,
          session_duration: s.duration,
          session_order: s.session_order,
        })),
      ) as unknown as SessionCombinationRespType[][];
    for (
      let curr_round_idx = 0;
      curr_round_idx < sesn_round_cnt;
      ++curr_round_idx
    ) {
      const curr_round_slots = slot_rounds[curr_round_idx];
      if (!slot_map[int_start_date][curr_round_idx]) {
        slot_map[int_start_date][curr_round_idx] = [];
      }
      slot_map[int_start_date][curr_round_idx].push({
        plan_comb_id: nanoid(),
        sessions: [...curr_round_slots],
        no_slot_reasons: [],
      });
    }
  }

  for (let curr_int_day_slots of Object.values(slot_map)) {
    const curr_day_plan: DateRangePlansType['interview_rounds'] =
      curr_int_day_slots.map((curr_round_plans) => {
        return {
          curr_round_date: '', // not used
          plans: curr_round_plans,
        };
      });
    all_day_plans.push(planCombineSlots(curr_day_plan));
  }

  return all_day_plans;
};
