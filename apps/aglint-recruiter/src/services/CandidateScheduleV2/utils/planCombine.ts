import {
  DateRangePlansType,
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionsCombType,
  SessionSlotType,
} from '@aglint/shared-types';
import { nanoid } from 'nanoid';

export const planCombineSlots = (
  plan_combs: DateRangePlansType['interview_rounds'],
) => {
  const convertCombsToTimeSlot = (
    all_plan_combs: PlanCombinationRespType[],
  ) => {
    const convertSessionCombToSlot = (
      session_comb: SessionCombinationRespType,
    ) => {
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
        meeting_id: session_comb.meeting_id,
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
    const curr_day_session_slots = convertCombsToTimeSlot(curr_comb.plans);
    multi_day_slots.push(curr_day_session_slots);
  }
  return multi_day_slots;
};
