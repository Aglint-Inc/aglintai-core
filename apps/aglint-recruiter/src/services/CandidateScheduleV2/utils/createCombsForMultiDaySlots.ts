/* eslint-disable security/detect-object-injection */
import { PlanCombinationRespType } from '@aglint/shared-types';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

export const createCombsForMultiDaySlots = (
  all_combs: PlanCombinationRespType[][][],
) => {
  const total_rounds = all_combs[0].length;
  const findMultiDaySlot = (
    final_combs: PlanCombinationRespType[],
    curr_int_day_combs: PlanCombinationRespType[][],
    curr_round_idx: number,
  ): PlanCombinationRespType[] => {
    if (curr_round_idx === total_rounds) {
      return final_combs;
    }

    let combs: PlanCombinationRespType[] = curr_int_day_combs[curr_round_idx];
    if (combs.length === 0) {
      return [];
    }
    if (final_combs.length === 0) {
      final_combs = cloneDeep(combs);
    } else {
      const temp_combs: PlanCombinationRespType[] = [];
      const next_day_combs: PlanCombinationRespType[] = cloneDeep(combs);
      for (let final_slot of final_combs) {
        for (let nextdaySlot of next_day_combs) {
          temp_combs.push({
            plan_comb_id: nanoid(),
            sessions: [...final_slot.sessions, ...nextdaySlot.sessions],
            no_slot_reasons: [],
          });
        }
      }
      final_combs = cloneDeep(temp_combs);
    }

    return findMultiDaySlot(
      final_combs,
      curr_int_day_combs,
      curr_round_idx + 1,
    );
  };
  const all_day_combs: PlanCombinationRespType[][] = [];
  for (let curr_day_idx = 0; curr_day_idx < all_combs.length; curr_day_idx++) {
    const curr_day_combs = findMultiDaySlot([], all_combs[curr_day_idx], 0);
    if (curr_day_combs.length > 0) {
      all_day_combs.push([...curr_day_combs]);
    }
  }

  return all_day_combs;
};
