/* eslint-disable security/detect-object-injection */
import {
  DateRangePlansType,
  MultiDayPlanType,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

export const createCombsForMultiDaySlots = (
  all_combs: DateRangePlansType[],
) => {
  const total_rounds = all_combs[0].interview_rounds.length;
  const findMultiDaySlot = (
    final_combs: MultiDayPlanType,
    curr_int_day_combs: DateRangePlansType['interview_rounds'],
    curr_round_idx: number,
  ): MultiDayPlanType => {
    if (curr_round_idx === total_rounds) {
      return final_combs;
    }

    let current_round = curr_int_day_combs[curr_round_idx];

    // if for any rounds plans are empty
    if (current_round.plans.length === 0) {
      return null;
    }

    if (!final_combs) {
      final_combs = {
        date_range: [current_round.curr_date],
        plans: [...current_round.plans],
      };
    } else {
      final_combs.date_range.push(current_round.curr_date);
      const temp_combs: PlanCombinationRespType[] = [];
      const next_day_combs: PlanCombinationRespType[] = [
        ...current_round.plans,
      ];

      let is_break = false;
      for (let final_slot of final_combs.plans) {
        for (let nextdaySlot of next_day_combs) {
          if (
            final_slot.no_slot_reasons.length > 0 ||
            nextdaySlot.no_slot_reasons.length > 0
          ) {
            temp_combs.push({
              plan_comb_id: nanoid(),
              no_slot_reasons: [
                ...final_slot.no_slot_reasons,
                ...nextdaySlot.no_slot_reasons,
              ],
              sessions: [],
            });
            is_break = true;
            break;
          } else {
            temp_combs.push({
              plan_comb_id: nanoid(),
              sessions: [...final_slot.sessions, ...nextdaySlot.sessions],
              no_slot_reasons: [],
            });
          }
        }
        if (is_break) {
          break;
        }
      }
      final_combs.plans = cloneDeep(temp_combs);
    }

    return findMultiDaySlot(
      final_combs,
      curr_int_day_combs,
      curr_round_idx + 1,
    );
  };
  const all_day_combs: MultiDayPlanType[] = [];
  for (let curr_day_idx = 0; curr_day_idx < all_combs.length; curr_day_idx++) {
    const curr_day_combs = findMultiDaySlot(
      null,
      all_combs[curr_day_idx].interview_rounds,
      0,
    );
    if (curr_day_combs) {
      curr_day_combs.plans = curr_day_combs.plans.map((c) => {
        return {
          ...c,
          no_slot_reasons: Array.from(
            new Set(c.no_slot_reasons.map((r) => r.reason)),
          ).map((reason) => ({
            reason,
          })),
        };
      });
      all_day_combs.push({
        ...curr_day_combs,
      });
    }
  }

  return all_day_combs;
};
