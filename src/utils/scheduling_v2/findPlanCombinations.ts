import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import {
  InterviewModuleApiType,
  InterviewPlanScheduleDbType,
} from '@/src/components/JobInterviewPlan/types';

import {
  calcIntervCombsForModule,
  ModuleCombination,
} from './calcIntervCombsForModule';
import { findCommonTimeRange } from './findCommonTimeRange';
import { InterDetailsType, IntervCntApp, TimeDurationType } from './types';

export const findPlanCombinations = (
  interview_plan: InterviewModuleApiType[],
  interv_free_time: InterDetailsType[],
) => {
  const cached_free_time = new Map<string, TimeDurationType[]>();
  let all_schedule_combs: InterviewPlanScheduleDbType[] = [];

  const module_combs = calcIntervCombsForModule(
    interview_plan.filter((item) => !item.isBreak),
  );

  const explore_module_combs = (
    current_comb: ModuleCombination[],
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
  const calcMeetingCombinsForPlan = (plan_comb: ModuleCombination[]) => {
    const schedule_combs: InterviewPlanScheduleDbType[] = [];
    const getInterviewersCommonTime = (curr_module: ModuleCombination) => {
      const all_int_attendees = [
        ...curr_module.selectedIntervs,
        ...curr_module.shadowIntervs,
        ...curr_module.revShadowIntervs,
      ];
      let map_key: string[] = [
        curr_module.module_id,
        ...all_int_attendees.map((s) => s.interv_id),
      ];
      map_key = map_key.sort();
      if (cached_free_time.has(map_key.join('_'))) {
        return cached_free_time.get(map_key.join('_'));
      }
      const common_time_range = findCommonTimeRange(
        all_int_attendees.map((s) => ({
          inter_id: s.interv_id,
          time_ranges: interv_free_time.find(
            (i) => i.interviewer_id === s.interv_id,
          ).freeTimes,
          interviewer_pause: s.pause_json,
        })),
      );
      cached_free_time.set(map_key.join('_'), common_time_range);
      return common_time_range;
    };

    const getMeetingBreakDuration = (module_id) => {
      let mod_idx = interview_plan.findIndex((m) => m.module_id === module_id);
      if (
        mod_idx > 0 &&
        mod_idx <= interview_plan.length &&
        interview_plan[Number(mod_idx - 1)].isBreak
      ) {
        return interview_plan[Number(mod_idx - 1)].duration;
      }
      return 0;
    };

    const findIsModuleAvailable = (
      module_idx: number,
      prev_time_range: TimeDurationType,
      shedule_comb: InterviewPlanScheduleDbType,
    ) => {
      if (module_idx === plan_comb.length) {
        return true;
      }
      const module_comb = plan_comb[Number(module_idx)];
      const break_duration = getMeetingBreakDuration(module_comb.module_id);
      if (break_duration > 0) {
        shedule_comb.plans.push({
          isBreak: true,
          duration: break_duration,
          start_time: prev_time_range.endTime,
          end_time: dayjs(prev_time_range.endTime)
            .add(break_duration, 'minutes')
            .toISOString(),
          module_id: '',
          module_name: '',
          revShadowIntervs: [],
          session_name: '',
          shadowIntervs: [],
          selectedIntervs: [],
          meeting_type: null,
        });
      }
      let required_time: TimeDurationType = {
        startTime: dayjs(prev_time_range.endTime)
          .add(break_duration, 'minutes')
          .toISOString(),
        endTime: dayjs(prev_time_range.endTime)
          .add(module_comb.duration + break_duration, 'minutes')
          .toISOString(),
      };

      const common_time = getInterviewersCommonTime(module_comb);

      for (let free_time of common_time) {
        if (
          dayjs(free_time.startTime).unix() <=
            dayjs(required_time.startTime).unix() &&
          dayjs(free_time.endTime).unix() >= dayjs(required_time.endTime).unix()
        ) {
          shedule_comb.plans.push({
            module_id: module_comb.module_id,
            isBreak: false,
            start_time: required_time.startTime,
            end_time: required_time.endTime,
            selectedIntervs: module_comb.selectedIntervs,
            duration: module_comb.duration,
            module_name: module_comb.module_name,
            session_name: module_comb.session_name,
            revShadowIntervs: module_comb.revShadowIntervs,
            shadowIntervs: module_comb.shadowIntervs,
            meeting_type: module_comb.meeting_type,
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
          let int_cnt = mp.get(int.interv_id);
          if (int_cnt) {
            int_cnt.meet_cnt += 1;
            int_cnt.dur_cnt += mod.duration;
          } else {
            int_cnt = {
              meet_cnt: 1,
              dur_cnt: mod.duration,
            };
            mp.set(int.interv_id, int_cnt);
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
    const first_meeting = plan_comb[0];
    const first_mod_comon_time = getInterviewersCommonTime(first_meeting);
    for (let time_range of first_mod_comon_time) {
      const curr_time_range: TimeDurationType = {
        startTime: time_range.startTime,
        endTime: dayjs(time_range.startTime)
          .add(first_meeting.duration, 'minutes')
          .toISOString(),
      };

      while (
        dayjs(curr_time_range.startTime).unix() <
          dayjs(time_range.endTime).unix() &&
        dayjs(curr_time_range.endTime).unix() <=
          dayjs(time_range.endTime).unix()
      ) {
        let schedule_plan: InterviewPlanScheduleDbType = {
          id: nanoid(),
          plans: [
            {
              module_id: first_meeting.module_id,
              isBreak: false,
              selectedIntervs: first_meeting.selectedIntervs,
              duration: first_meeting.duration,
              start_time: curr_time_range.startTime,
              end_time: curr_time_range.endTime,
              module_name: first_meeting.module_name,
              session_name: first_meeting.session_name,
              revShadowIntervs: first_meeting.revShadowIntervs,
              shadowIntervs: first_meeting.shadowIntervs,
              meeting_type: first_meeting.meeting_type,
            },
          ],
        };
        if (findIsModuleAvailable(1, curr_time_range, schedule_plan)) {
          schedule_combs.push(schedule_plan);
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
