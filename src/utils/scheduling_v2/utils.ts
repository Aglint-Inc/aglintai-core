import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { nanoid } from 'nanoid';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import {
  holidayType,
  schedulingSettingType,
} from '@/src/types/scheduleTypes/scheduleSetting';

import {
  PlanCombinationType,
  SessionCombinationType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
  SessionsCombType,
  SessionSlotType,
} from '../../types/scheduleTypes/types';

export const combineSlots = (plan_combs: PlanCombinationType[][]) => {
  const convertCombsToTimeSlot = (all_plan_combs: PlanCombinationType[]) => {
    const convertSessionCombToSlot = (session_comb: SessionCombinationType) => {
      const session_slot: SessionSlotType = {
        break_duration: session_comb.break_duration,
        duration: session_comb.duration,
        interviewer_cnt: session_comb.interviewer_cnt,
        location: session_comb.location,
        module_name: session_comb.module_name,
        schedule_type: session_comb.schedule_type,
        session_id: session_comb.session_id,
        session_name: session_comb.session_name,
        session_order: session_comb.session_order,
        session_type: session_comb.session_type,
        start_time: session_comb.start_time,
        end_time: session_comb.end_time,
      };
      return session_slot;
    };

    let mp = new Map<string, SessionsCombType>();
    for (const plan_comb of all_plan_combs) {
      const slot_start_time = plan_comb.sessions[0].start_time;
      const slot = mp.get(slot_start_time);
      if (slot) {
        slot.slot_cnt += 1;
        mp.set(slot_start_time, slot);
      } else {
        mp.set(slot_start_time, {
          slot_comb_id: nanoid(),
          sessions: plan_comb.sessions.map((s) => convertSessionCombToSlot(s)),
          slot_cnt: 1,
        });
      }
    }

    return Array.from(mp.values());
  };

  const multi_day_slots: SessionsCombType[][] = [];
  for (const curr_comb of plan_combs) {
    const curr_day_session_slots = convertCombsToTimeSlot(curr_comb);
    multi_day_slots.push(curr_day_session_slots);
  }
  return multi_day_slots;
};

export const convertIntToResp = (inters: SessionInterviewerType[]) => {
  const r: SessionInterviewerApiRespType[] = inters.map((i) => ({
    email: i.email,
    first_name: i.first_name,
    last_name: i.last_name,
    profile_image: i.profile_image,
    training_type: i.training_type,
    interviewer_type: i.interviewer_type,
    interview_module_relation_id: i.interview_module_relation_id,
  }));

  return r;
};

export const getNextWorkingDay = (
  comp_schedule_setting: schedulingSettingType,
  curr_day: Dayjs,
  day_gap = 1,
) => {
  let nxt_day = curr_day.add(day_gap, 'day');

  let flag = true;
  while (flag) {
    // is curr day holiday
    if (
      comp_schedule_setting.totalDaysOff.find((holiday: holidayType) =>
        nxt_day.isSame(dayjs(holiday.date, 'DD MMM YYYY'), 'date'),
      )
    ) {
      nxt_day = nxt_day.add(1, 'day');
      continue;
    }
    const work_day = comp_schedule_setting.workingHours.find(
      (day) => nxt_day.format('dddd').toLowerCase() === day.day,
    );
    // is day week off
    if (!work_day.isWorkDay) {
      nxt_day = nxt_day.add(1, 'day');
      continue;
    }

    break;
  }
  return nxt_day;
};
