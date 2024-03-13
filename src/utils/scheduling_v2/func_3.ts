import dayjs from 'dayjs';

import { TimeDurationType } from './types';

type FuncParams = {
  inter_id: string;
  time_ranges: TimeDurationType[];
}[];

export const findCommonTimeRange = (inters: FuncParams): TimeDurationType[] => {
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
