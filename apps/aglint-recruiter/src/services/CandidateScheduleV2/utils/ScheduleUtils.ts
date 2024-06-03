/* eslint-disable security/detect-object-injection */
import {
  PlanCombinationRespType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { userTzDayjs } from './userTzDayjs';

export class ScheduleUtils {
  static convertDateFormatToDayjs = (
    user_date,
    user_tz: string,
    is_start_day = true,
  ) => {
    const [day, month, year] = user_date.split('/');
    if (!day || !month || !year) {
      throw new Error(`Date should in the format DD/MM/YYYY`);
    }
    let user_dayjs = userTzDayjs.tz(`${year}-${month}-${day} 12:00`, user_tz);
    if (is_start_day) {
      user_dayjs = user_dayjs.startOf('day');
    } else {
      user_dayjs = user_dayjs.endOf('day');
    }
    return user_dayjs;
  };
  static setTimeInDay = (
    current_day: string,
    time: string, // scheduling settign time eg .. '09:00'
    timeZone: string,
  ) => {
    const [hours, minutes] = time.split(':');
    let userTime = userTzDayjs(current_day).tz(timeZone);
    userTime = userTime.set('hour', Number(hours));
    userTime = userTime.set('minutes', Number(minutes));

    return userTime;
  };
  static getNearestCurrTime = (tz: string) => {
    let curr_world_time = userTzDayjs().tz(tz);
    curr_world_time = curr_world_time
      .add(2, 'hour')
      .set('minutes', 0)
      .set('seconds', 0);
    return curr_world_time;
  };
  static convertTimedurationJsToStr = (
    t: TimeDurationDayjsType,
  ): TimeDurationType => {
    return {
      startTime: t.startTime.format(),
      endTime: t.endTime.format(),
    };
  };
  static createCombsForMultiDaySlots = (
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
    for (
      let curr_day_idx = 0;
      curr_day_idx < all_combs.length;
      curr_day_idx++
    ) {
      const curr_day_combs = findMultiDaySlot([], all_combs[curr_day_idx], 0);
      if (curr_day_combs.length > 0) {
        all_day_combs.push([...curr_day_combs]);
      }
    }

    return all_day_combs;
  };
}
