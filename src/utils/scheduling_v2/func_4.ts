import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import {
  InterviewModuleDbType,
  InterviewPlanScheduleDbType
} from '@/src/components/JobInterviewPlan/types';

import { calcIntervCombsForModule, ModuleCombination } from './func_2';
import { findCommonTimeRange } from './func_3';
import { InterDetailsType, TimeDurationType } from './types';

export const findPlanCombinations = (
  interview_plan: InterviewModuleDbType[],
  interv_free_time: InterDetailsType[]
) => {
  const cached_free_time = new Map<string, TimeDurationType[]>();
  let all_schedule_combs: InterviewPlanScheduleDbType[] = [];

  const module_combs = calcIntervCombsForModule(
    interview_plan.filter((item) => !item.isBreak)
  );
  const explore_module_combs = (
    current_comb: ModuleCombination[],
    module_idx
  ) => {
    if (module_idx === module_combs.length) {
      const combs = calcMeetingCombinsForPlan(current_comb);
      all_schedule_combs = [...all_schedule_combs, ...combs];
      return;
    }

    for (let module_comb of module_combs[Number(module_idx)]) {
      current_comb.push(module_comb);
      explore_module_combs(current_comb, module_idx + 1);
      current_comb.push(module_comb);
    }
  };

  const calcMeetingCombinsForPlan = (plan_comb: ModuleCombination[]) => {
    const schedule_combs: InterviewPlanScheduleDbType[] = [];
    const getInterviewersCommonTime = (inter_ids: string[]) => {
      if (cached_free_time.has(inter_ids.join('_')))
        return cached_free_time.get(inter_ids.join('_'));
      const common_time_range = findCommonTimeRange(
        interv_free_time
          .filter((int) => inter_ids.find((str) => str === int.interviewer_id))
          .map((i) => ({
            inter_id: i.interviewer_id,
            time_ranges: i.freeTimes
          }))
      );
      cached_free_time.set(inter_ids.join('_'), common_time_range);
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
      shedule_comb: InterviewPlanScheduleDbType
    ) => {
      if (module_idx === plan_comb.length) {
        return true;
      }
      const module_comb = plan_comb[Number(module_idx)];
      const break_duration = getMeetingBreakDuration(module_comb.module_id);
      if (break_duration > 0) {
        shedule_comb.plan.push({
          isBreak: true,
          duration: break_duration,
          attended_inters: [],
          start_time: prev_time_range.startTime,
          end_time: dayjs(prev_time_range.endTime)
            .add(break_duration, 'minutes')
            .toISOString(),
          module_id: '',
          module_name: ''
        });
      }
      let required_time: TimeDurationType = {
        startTime: dayjs(prev_time_range.endTime)
          .add(break_duration, 'minutes')
          .toISOString(),
        endTime: dayjs(prev_time_range.endTime)
          .add(module_comb.duration + break_duration, 'minutes')
          .toISOString()
      };

      const common_time = getInterviewersCommonTime(
        module_comb.participating_inters.map((i) => i.id)
      );

      for (let free_time of common_time) {
        if (
          dayjs(free_time.startTime).unix() <=
            dayjs(required_time.startTime).unix() &&
          dayjs(free_time.endTime).unix() >= dayjs(required_time.endTime).unix()
        ) {
          shedule_comb.plan.push({
            module_id: module_comb.module_id,
            isBreak: false,
            start_time: required_time.startTime,
            end_time: required_time.endTime,
            attended_inters: module_comb.participating_inters,
            duration: module_comb.duration,
            module_name: module_comb.module_name
          });
          return findIsModuleAvailable(
            module_idx + 1,
            required_time,
            shedule_comb
          );
        }
      }

      return false;
      // const required_time_range = dayjs
    };

    const first_meeting = plan_comb[0];
    const first_mod_comon_time = getInterviewersCommonTime(
      first_meeting.participating_inters.map((i) => i.id)
    );
    for (let time_range of first_mod_comon_time) {
      const curr_time_range: TimeDurationType = {
        startTime: time_range.startTime,
        endTime: dayjs(time_range.startTime)
          .add(first_meeting.duration, 'minutes')
          .toISOString()
      };

      while (
        dayjs(curr_time_range.startTime).unix() <
          dayjs(time_range.endTime).unix() &&
        dayjs(curr_time_range.endTime).unix() <=
          dayjs(time_range.endTime).unix()
      ) {
        let schedule_plan: InterviewPlanScheduleDbType = {
          schedule_id: nanoid(),
          plan: [
            {
              module_id: first_meeting.module_id,
              isBreak: false,
              attended_inters: first_meeting.participating_inters,
              duration: first_meeting.duration,
              start_time: curr_time_range.startTime,
              end_time: curr_time_range.endTime,
              module_name: first_meeting.module_name
            }
          ]
        };
        if (findIsModuleAvailable(1, curr_time_range, schedule_plan)) {
          schedule_combs.push(schedule_plan);
        }

        curr_time_range.startTime = dayjs(curr_time_range.startTime)
          .add(5, 'minutes')
          .toISOString();
        curr_time_range.endTime = dayjs(curr_time_range.endTime)
          .add(5, 'minutes')
          .toISOString();
      }
    }

    return schedule_combs;
  };

  explore_module_combs([], 0);

  return all_schedule_combs;
};
