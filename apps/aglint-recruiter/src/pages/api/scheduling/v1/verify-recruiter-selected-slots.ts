/* eslint-disable security/detect-object-injection */
import {
  APIVerifyRecruiterSelectedSlots,
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionsCombType,
} from '@aglint/shared-types';
import {
  ScheduleUtils,
  scheduling_options_schema,
  supabaseWrap,
} from '@aglint/shared-utils';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { planCombineSlots } from '@/src/services/CandidateScheduleV2/utils/planCombine';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { api_options, filter_json_id, candidate_tz } =
    req.body as APIVerifyRecruiterSelectedSlots;
  try {
    const { filter_json_data } = await fetch_details_from_db(filter_json_id);
    const selected_options =
      filter_json_data.selected_options as PlanCombinationRespType[];

    let zod_options = v.parse(scheduling_options_schema, {
      ...api_options,
      include_conflicting_slots: api_options?.include_conflicting_slots || {},
    });
    if (!selected_options) {
      zod_options = v.parse(scheduling_options_schema, {
        include_conflicting_slots: {},
      });
    }
    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: candidate_tz,
        end_date_str: filter_json_data.filter_json.end_date,
        recruiter_id: filter_json_data.interview_schedule.recruiter_id,
        session_ids: filter_json_data.session_ids,
        start_date_str: filter_json_data.filter_json.start_date,
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
    res.status(500).send(error.message);
  }
};

export default handler;

const fetch_details_from_db = async (filter_json_id: string) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select('*,interview_schedule(recruiter_id)')
      .eq('id', filter_json_id),
  );
  if (!filter_json_data) throw new Error('invalid filter_json_id');

  return {
    filter_json_data,
  };
};

const convertOptionsToDateRangeSlots = (
  verified_options: PlanCombinationRespType[],
  candidate_tz: string,
) => {
  let all_day_plans: SessionsCombType[][][] = [];
  const sesn_round_cnt = ScheduleUtils.getSessionRounds(
    verified_options[0].sessions,
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
    const slot_rounds = ScheduleUtils.getSessionRounds(
      slot_option.sessions,
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
      });
    }
  }

  for (let curr_int_day_slots of Object.values(slot_map)) {
    all_day_plans.push(planCombineSlots(curr_int_day_slots));
  }

  return all_day_plans;
};
