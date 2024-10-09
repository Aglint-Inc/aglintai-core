import {
  type DatabaseTable,
  type DateRangePlansType,
  type PlanCombinationRespType,
  type SessionCombinationRespType,
  type SessionsCombType,
} from '@aglint/shared-types';
import { CApiError, dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import { nanoid } from 'nanoid';

import { CandidatesScheduling } from '../../CandidatesScheduling';
import { planCombineSlots } from '../planCombine';

export const verifyRecruiterSelectedSlots = async ({
  candidate_tz,
  company_id,
  selected_options,
  session_ids,
}: {
  candidate_tz: string;
  company_id: string;
  selected_options: DatabaseTable['interview_filter_json']['selected_options'];
  session_ids: string[];
}) => {
  const { filered_selected_options, start_date_str, end_date_str } =
    sortSelctedPlans({ selected_options, candidate_tz, session_ids });
  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
    },
    cand_start_time: 0,
    cand_end_time: 24,
  });
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: candidate_tz,
      end_date_str: end_date_str,
      company_id: company_id,
      session_ids: session_ids,
      start_date_str: start_date_str,
    },
  });

  const verified_slots = cand_schedule.verifyIntSelectedSlots(
    filered_selected_options,
  );

  if (verified_slots.length === 0) {
    throw new CApiError('CLIENT', 'All slots are booked or invalid');
  }
  return { cand_schedule, verified_slots };
};

const sortSelctedPlans = ({
  candidate_tz,
  selected_options,
  session_ids,
}: {
  selected_options: DatabaseTable['interview_filter_json']['selected_options'];
  session_ids: string[];
  candidate_tz: string;
}) => {
  let filered_selected_options: PlanCombinationRespType[] = [];
  filered_selected_options = selected_options.map((plan) => {
    const updated_plan = { ...plan };
    updated_plan.sessions = updated_plan.sessions.filter((s) =>
      session_ids.includes(s.session_id),
    );
    return updated_plan;
  });
  const sorted_options = filered_selected_options.sort(
    (plan1, plan2) =>
      dayjsLocal(plan1.sessions[0].start_time).unix() -
      dayjsLocal(plan2.sessions[0].start_time).unix(),
  );
  const start_date_str = dayjsLocal(sorted_options[0].sessions[0].start_time)
    .tz(candidate_tz)
    .startOf('date')
    .format('DD/MM/YYYY');
  const end_date_str = dayjsLocal(
    sorted_options[sorted_options.length - 1].sessions[
      sorted_options[0].sessions.length - 1
    ].end_time,
  )
    .tz(candidate_tz)
    .endOf('date')
    .format('DD/MM/YYYY');

  return {
    filered_selected_options,
    start_date_str,
    end_date_str,
  };
};

export const convertOptionsToDateRangeSlots = (
  verified_options: PlanCombinationRespType[],
  candidate_tz: string,
) => {
  const all_day_plans: SessionsCombType[][][] = [];
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

  for (const slot_option of verified_options) {
    const int_start_date = dayjsLocal(slot_option.sessions[0].start_time)
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

  for (const curr_int_day_slots of Object.values(slot_map)) {
    const curr_day_plan: DateRangePlansType['interview_rounds'] =
      curr_int_day_slots.map((curr_round_plans) => {
        return {
          curr_date: '', // not used
          plans: curr_round_plans,
        };
      });
    all_day_plans.push(planCombineSlots(curr_day_plan));
  }

  return all_day_plans;
};
