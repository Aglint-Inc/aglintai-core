import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import {
  InterviewSessionApiType,
  PlanCombinationType,
} from '../scheduling_v1/types';
import { calcIntervCombsForModule } from './calcIntervCombsForModule';
import { findCommonTimeRange } from './findCommonTimeRange';
import { InterDetailsType, IntervCntApp, TimeDurationType } from './types';

export const findPlanCombinations = (
  interview_plan: InterviewSessionApiType[],
  interv_free_time: InterDetailsType[],
) => {
  const cached_free_time = new Map<string, TimeDurationType[]>();
  let all_schedule_combs: PlanCombinationType[] = [];

  const module_combs = calcIntervCombsForModule(interview_plan);

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
      const plan_session = plan_comb[Number(module_idx)];
      const break_duration = plan_session.break_duration;

      let required_time: TimeDurationType = {
        startTime: dayjs(prev_time_range.endTime)
          .add(break_duration, 'minutes')
          .toISOString(),
        endTime: dayjs(prev_time_range.endTime)
          .add(plan_session.duration + break_duration, 'minutes')
          .toISOString(),
      };

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
        let plan_comb: PlanCombinationType = {
          plan_comb_id: nanoid(),
          sessions: [
            {
              ...first_session,
              start_time: curr_time_range.startTime,
              end_time: curr_time_range.endTime,
            },
          ],
        };

        if (findIsModuleAvailable(1, curr_time_range, plan_comb)) {
          schedule_combs.push(plan_comb);
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
