/* eslint-disable security/detect-object-injection */
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { schedulingSettingType } from '@/src/components/Scheduling/Settings/types';

import { SINGLE_DAY_TIME } from '../integrations/constants';
import {
  InterviewSessionApiType,
  PlanCombinationRespType,
  PlanCombinationType,
  SessionCombinationRespType,
} from '../scheduling_v1/types';
import { calcIntervCombsForModule } from './calcIntervCombsForModule';
import { findCommonTimeRange } from './findCommonTimeRange';
import { findEachInterviewerFreeTimes } from './findEachInterviewerFreeTimes';
import { InterDetailsType, IntervCntApp, TimeDurationType } from './types';
import {
  convertDayjsToUserTimeZoneDate,
  convertIntToResp,
  getNextWorkingDay,
} from './utils';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const findFixedTimeCombs = (
  interview_sessions: InterviewSessionApiType[],
  interv_free_time: InterDetailsType[],
) => {
  const cached_free_time = new Map<string, TimeDurationType[]>();
  let all_schedule_combs: PlanCombinationType[] = [];

  const module_combs = calcIntervCombsForModule(interview_sessions);
  const explore_module_combs = (
    current_comb: InterviewSessionApiType[],
    module_idx,
  ) => {
    if (module_idx === module_combs.length) {
      const combs = calcMeetingCombinsForPlan(current_comb);
      all_schedule_combs = [...all_schedule_combs, ...combs];
      return;
    }

    for (let module_comb of module_combs[Number(module_idx)]) {
      current_comb.push(module_comb);
      explore_module_combs(current_comb, module_idx + 1);
      current_comb.pop();
    }
  };

  // given one combination of plan find all possible times for that plan
  const calcMeetingCombinsForPlan = (plan_comb: InterviewSessionApiType[]) => {
    const schedule_combs: PlanCombinationType[] = [];
    const getInterviewersCommonTime = (
      curr_session: InterviewSessionApiType,
    ) => {
      const all_int_attendees = [
        ...curr_session.selectedIntervs,
        ...curr_session.shadowIntervs,
        ...curr_session.revShadowIntervs,
      ];
      let map_key: string[] = [
        curr_session.session_id,
        ...all_int_attendees.map((s) => s.user_id),
      ];
      map_key = map_key.sort();
      if (cached_free_time.has(map_key.join('_'))) {
        return cached_free_time.get(map_key.join('_'));
      }

      const common_time_range = findCommonTimeRange(
        all_int_attendees.map((s) => ({
          inter_id: s.user_id,
          time_ranges: interv_free_time.find(
            (i) => i.interviewer_id === s.user_id,
          ).freeTimes,
          interviewer_pause: s.pause_json,
        })),
      );
      cached_free_time.set(map_key.join('_'), common_time_range);
      return common_time_range;
    };

    const findIsModuleAvailable = (
      module_idx: number,
      prev_time_range: TimeDurationType,
      shedule_comb: PlanCombinationType,
    ) => {
      if (module_idx === plan_comb.length) {
        return true;
      }
      const prev_session = plan_comb[Number(module_idx - 1)];
      const break_duration = prev_session.break_duration;
      let required_time: TimeDurationType = {
        startTime: dayjs(prev_time_range.endTime)
          .add(break_duration, 'minutes')
          .format(),
        endTime: dayjs(prev_time_range.endTime)
          .add(prev_session.duration + break_duration, 'minutes')
          .format(),
      };
      const plan_session = plan_comb[Number(module_idx)];
      const common_time = getInterviewersCommonTime(plan_session);

      for (let free_time of common_time) {
        if (
          dayjs(free_time.startTime).unix() <=
            dayjs(required_time.startTime).unix() &&
          dayjs(free_time.endTime).unix() >= dayjs(required_time.endTime).unix()
        ) {
          shedule_comb.sessions.push({
            ...plan_session,
            start_time: required_time.startTime,
            end_time: required_time.endTime,
          });
          return findIsModuleAvailable(
            module_idx + 1,
            required_time,
            shedule_comb,
          );
        }
      }

      return false;
      // const required_time_range = dayjs
    };

    const isPlanPossible = () => {
      let flag = true;
      let mp = new Map<string, IntervCntApp>();
      for (let mod of plan_comb) {
        let all_ints = [
          ...mod.selectedIntervs,
          ...mod.shadowIntervs,
          ...mod.revShadowIntervs,
        ];
        for (const int of all_ints) {
          let int_cnt = mp.get(int.user_id);
          if (int_cnt) {
            int_cnt.meet_cnt += 1;
            int_cnt.dur_cnt += mod.duration;
          } else {
            int_cnt = {
              meet_cnt: 1,
              dur_cnt: mod.duration,
            };
            mp.set(int.user_id, int_cnt);
          }
        }
      }

      for (let [int_id, int_cnt] of mp) {
        const int_setting = interv_free_time.find(
          (i) => i.interviewer_id === int_id,
        );
        let load = int_setting.shedule_settings.interviewLoad.dailyLimit;
        if (load.type === 'Interviews' && load.value < int_cnt.meet_cnt) {
          flag = false;
        } else if (load.type === 'Hours' && load.value * 60 < int_cnt.dur_cnt) {
          flag = false;
        }
        if (!flag) break;
      }
      return flag;
    };

    // check for load balance setting
    if (!isPlanPossible()) return schedule_combs;
    const first_session = plan_comb[0];
    const first_mod_comon_time = getInterviewersCommonTime(first_session);
    for (let time_range of first_mod_comon_time) {
      const curr_time_range: TimeDurationType = {
        startTime: time_range.startTime,
        endTime: dayjs(time_range.startTime)
          .add(first_session.duration, 'minutes')
          .toISOString(),
      };

      while (
        dayjs(curr_time_range.startTime).unix() <
          dayjs(time_range.endTime).unix() &&
        dayjs(curr_time_range.endTime).unix() <=
          dayjs(time_range.endTime).unix()
      ) {
        let session_comb: PlanCombinationType = {
          plan_comb_id: nanoid(),
          sessions: [
            {
              ...first_session,
              start_time: curr_time_range.startTime,
              end_time: curr_time_range.endTime,
            },
          ],
        };

        if (findIsModuleAvailable(1, curr_time_range, session_comb)) {
          schedule_combs.push(session_comb);
        }

        curr_time_range.startTime = dayjs(curr_time_range.startTime)
          .add(30, 'minutes')
          .toISOString();
        curr_time_range.endTime = dayjs(curr_time_range.endTime)
          .add(30, 'minutes')
          .toISOString();
      }
    }
    return schedule_combs;
  };
  explore_module_combs([], 0);
  return all_schedule_combs;
};

// recruiter side
export const findMultiDayComb = (
  interview_sessions: InterviewSessionApiType[],
  intervs_details_with_events: InterDetailsType[],
  dayjs_start_date: Dayjs,
  dayjs_end_date: Dayjs,
  user_tz: string,
  comp_schedule_setting: schedulingSettingType,
) => {
  let session_rounds: InterviewSessionApiType[][] = [[]];
  let curr_round = 0;
  for (let sess of interview_sessions) {
    session_rounds[curr_round].push({ ...sess });
    if (sess.break_duration >= SINGLE_DAY_TIME) {
      session_rounds.push([]);
      curr_round++;
    }
  }
  session_rounds = session_rounds.filter((s) => s.length > 0);

  const findMultiDayPlanUtil = (
    final_combs: PlanCombinationType[],
    curr_date: Dayjs,
    curr_day_idx: number,
  ): PlanCombinationType[] => {
    if (curr_day_idx === session_rounds.length) {
      return final_combs;
    }

    if (dayjs(curr_date).isAfter(dayjs_end_date, 'date')) {
      return [];
    }

    const curr_day_start_time = convertDayjsToUserTimeZoneDate(
      curr_date,
      user_tz,
      true,
    );
    const curr_day_end_time = convertDayjsToUserTimeZoneDate(
      curr_date,
      user_tz,
      false,
    );

    const interv_curr_day_free_time = findEachInterviewerFreeTimes(
      intervs_details_with_events,
      curr_day_start_time,
      curr_day_end_time,
    );

    const combs = findFixedTimeCombs(
      cloneDeep(session_rounds[curr_day_idx]),
      interv_curr_day_free_time,
    );
    if (combs.length === 0) {
      return [];
    }
    if (final_combs.length === 0) {
      final_combs = cloneDeep(combs);
    } else {
      const temp_combs: PlanCombinationType[] = [];
      const next_day_combs: PlanCombinationType[] = cloneDeep(combs);
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

    const days_gap = Math.floor(
      session_rounds[curr_day_idx][session_rounds[curr_day_idx].length - 1]
        .break_duration / SINGLE_DAY_TIME,
    );

    const next_day = getNextWorkingDay(
      comp_schedule_setting,
      curr_date,
      days_gap,
    );
    return findMultiDayPlanUtil(final_combs, next_day, ++curr_day_idx);
  };

  let curr_date = dayjs_start_date;
  let all_combs: PlanCombinationRespType[] = [];
  while (curr_date.isSameOrBefore(dayjs_end_date)) {
    let combs = findMultiDayPlanUtil([], curr_date, 0);
    const tra_combs = combs.map((c) => {
      const sessions: SessionCombinationRespType[] = c.sessions.map((s) => {
        let sess: SessionCombinationRespType = {
          break_duration: s.break_duration,
          duration: s.duration,
          interviewer_cnt: s.interviewer_cnt,
          module_name: s.module_name,
          schedule_type: s.schedule_type,
          session_id: s.session_id,
          session_name: s.session_name,
          session_order: s.session_order,
          session_type: s.session_type,
          selectedIntervs: convertIntToResp(s.selectedIntervs),
          revShadowIntervs: convertIntToResp(s.revShadowIntervs),
          shadowIntervs: convertIntToResp(s.shadowIntervs),
          end_time: s.end_time,
          start_time: s.start_time,
        };

        return sess;
      });
      const p: PlanCombinationRespType = {
        plan_comb_id: nanoid(),
        sessions: sessions,
      };
      return p;
    });
    all_combs = [...all_combs, ...tra_combs];
    curr_date = getNextWorkingDay(comp_schedule_setting, curr_date);
  }
  return all_combs;
};
