import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { InterviewModuleRelationType } from '@/src/types/data.types';
dayjs.extend(isSameOrBefore);
import { cloneDeep } from 'lodash';

import { TimeDurationType } from './types';

type FuncParams = {
  inter_id: string;
  time_ranges: TimeDurationType[];
  interviewer_pause: InterviewModuleRelationType['pause_json'] | null;
}[];

export const findCommonTimeRange = (
  ints_meta: FuncParams
): TimeDurationType[] => {
  const inters = subtractpauseTimeFromFreeTimeRange(ints_meta);
  if (inters.find((i) => i.time_ranges.length === 0)) return [];

  let sorted_time_ranges: TimeDurationType[] = [];
  for (let inter of inters) {
    sorted_time_ranges = [...sorted_time_ranges, ...inter.time_ranges];
  }
  sorted_time_ranges = sorted_time_ranges.sort((time1, time2) => {
    return dayjs(time1.startTime).unix() - dayjs(time2.startTime).unix();
  });

  const common_time_ranges: TimeDurationType[] = [];
  let current_start_time: string | null,
    current_end_time: string | null = null;

  for (let { startTime, endTime } of sorted_time_ranges) {
    if (!current_end_time && !current_start_time) {
      current_start_time = startTime;
      current_end_time = endTime;
    } else if (dayjs(startTime).isBefore(current_end_time)) {
      // |----------------------| current
      //      |-----------|
      if (dayjs(startTime).isAfter(dayjs(current_start_time))) {
        current_start_time = startTime;
      }
      if (dayjs(endTime).isBefore(current_end_time)) {
        current_end_time = endTime;
      }
    } else if (dayjs(current_end_time).isBefore(startTime)) {
      common_time_ranges.push({
        startTime: current_start_time,
        endTime: current_end_time
      });
      current_start_time = startTime;
      current_end_time = endTime;
    }

    //
  }
  common_time_ranges.push({
    startTime: current_start_time,
    endTime: current_end_time
  });

  return common_time_ranges;
};

//pausing interviewers
// disjoint

// its a place we can do  optimize
export const subtractpauseTimeFromFreeTimeRange = (inters: FuncParams) => {
  const updInters = cloneDeep(inters);
  for (const int of updInters) {
    if (!int.interviewer_pause || int.time_ranges.length === 0) continue;
    if (int.interviewer_pause.isManual) {
      int.time_ranges = [];
    } else {
      int.time_ranges = int.time_ranges.filter((t) => {
        const flag =
          dayjs(t.endTime).isBefore(int.interviewer_pause.start_date, 'date') ||
          dayjs(t.startTime).isAfter(int.interviewer_pause.end_date, 'date');
        return flag;
      });
    }
  }

  return updInters;
};
