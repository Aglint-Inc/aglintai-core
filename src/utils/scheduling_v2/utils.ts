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
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  holidayType,
  schedulingSettingType,
} from '@/src/components/Scheduling/Settings/types';
import { SubTaskProgress } from '@/src/types/data.types';

import { SINGLE_DAY_TIME } from '../integrations/constants';
import {
  InterviewSessionApiRespType,
  PlanCombinationType,
  SessionCombinationType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
  SessionsCombType,
  SessionSlotType,
} from '../scheduling_v1/types';
import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const convertDateFormatToDayjs = (user_date, user_tz: string) => {
  const [day, month, year] = user_date.split('/');
  if (!day || !month || !year) {
    throw new Error(`Date should in the format DD/MM/YYYY`);
  }
  let user_dayjs = dayjs.tz(`${year}-${month}-${day} 12:00`, user_tz);
  return user_dayjs;
};

export const convertDayjsToUserTimeZoneDate = (
  user_date: Dayjs,
  userTimeZone,
  isStartTime = true,
) => {
  let d: Dayjs;
  d = user_date.tz(userTimeZone);
  if (isStartTime) {
    d = d.startOf('day');
  } else {
    d = d.endOf('day');
  }
  return d.format();
};

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

export const getCompWorkingDaysRange = (
  start_date: string,
  end_date: string,
  comp_schedule_setting: schedulingSettingType,
  int_sessions: InterviewSessionApiRespType[],
) => {
  let day_break_cnt = 0;
  int_sessions.slice(0, -1).forEach((s) => {
    const day_break = Math.floor(s.break_duration / SINGLE_DAY_TIME);
    if (day_break > 0) {
      day_break_cnt += day_break;
    }
  });
  const isCurrDayHoliday = (curr_day: Dayjs) => {
    // is curr day holiday
    if (
      comp_schedule_setting.totalDaysOff.find((holiday: holidayType) =>
        curr_day.isSame(dayjs(holiday.date, 'DD MMM YYYY'), 'date'),
      )
    ) {
      return true;
    }
    const work_day = comp_schedule_setting.workingHours.find(
      (day) => curr_day.format('dddd').toLowerCase() === day.day,
    );
    // is day week off
    if (!work_day.isWorkDay) {
      return true;
    }
  };

  const date_ranges: {
    start_date: string;
    end_date: string;
  }[] = [];
  let curr_day = dayjs(start_date);
  const end_day = dayjs(end_date);
  while (curr_day.isSameOrBefore(end_day, 'day')) {
    if (!isCurrDayHoliday(curr_day)) {
      const next_day = getNextWorkingDay(
        comp_schedule_setting,
        curr_day,
        day_break_cnt,
      );
      if (next_day.isSameOrBefore(end_day, 'day')) {
        date_ranges.push({
          start_date: curr_day.format('DD/MM/YYYY'),
          end_date: next_day.format('DD/MM/YYYY'),
        });
      }
    }
    curr_day = getNextWorkingDay(comp_schedule_setting, curr_day, 1);
  }

  return date_ranges;
};

// email agent
export const log_task_progress = async ({
  sub_task_id,
  log_msg,
  transcript,
  candidate_name,
  created_by,
  progress_type = 'standard',
}: {
  sub_task_id: string | null;
  log_msg: string;
  transcript?: { message: string };
  agent_type?: 'email_agent' | 'phone_agent';
  candidate_name?: string;
  created_by: {
    id: string;
    name: string;
  };
  progress_type: SubTaskProgress['progress_type'];
}) => {
  if (!sub_task_id) return;
  if (candidate_name) {
    log_msg = log_msg.replace(
      '{candidate}',
      `<span class="mention">@${candidate_name}</span>`,
    );
  }
  try {
    supabaseWrap(
      await supabaseAdmin
        .from('sub_task_progress')
        .insert({
          created_by: created_by,
          title: log_msg,
          jsonb_data: transcript ?? null,
          sub_task_id: sub_task_id,
          progress_type: progress_type,
        })
        .select(),
    );
  } catch (error) {
    // console.log(error);
  }
};
