/* eslint-disable security/detect-object-injection */
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

import { cloneDeep } from 'lodash';

import { InterviewModuleRelationType } from '@/src/types/data.types';

import { TimeDurationDayjsType, TimeDurationType } from './types';

type FuncParams = {
  inter_id: string;
  time_ranges: TimeDurationType[];
  interviewer_pause: InterviewModuleRelationType['pause_json'] | null;
}[];

type DayjsTimeRange = {
  inter_id: string;
  time_ranges: TimeDurationDayjsType[];
};

export const findCommonTimeRange = (
  ints_meta: FuncParams
): TimeDurationType[] => {
  const inters = subtractpauseTimeFromFreeTimeRange(ints_meta);
  if (inters.find((i) => i.time_ranges.length === 0)) return [];

  const int_sorted_range: DayjsTimeRange[] = inters.map((i) => ({
    inter_id: i.inter_id,
    time_ranges: i.time_ranges
      .sort((time1, time2) => {
        return dayjs(time1.startTime).unix() - dayjs(time2.startTime).unix();
      })
      .map((t) => ({
        startTime: dayjs(t.startTime),
        endTime: dayjs(t.endTime)
      }))
  }));

  let curr_intersection: TimeDurationDayjsType[] =
    int_sorted_range[0].time_ranges;

  for (let i = 1; i < int_sorted_range.length; ++i) {
    let current_time_ranges = [...int_sorted_range[Number(i)].time_ranges];
    let new_intersection: TimeDurationDayjsType[] = [];
    let j = 0,
      k = 0;
    while (j < curr_intersection.length && k < current_time_ranges.length) {
      // disjoint case 1
      if (
        current_time_ranges[k].endTime.isSameOrBefore(
          curr_intersection[j].startTime,
          'minutes'
        )
      ) {
        k++;
      }
      // disjoint case 2
      else if (
        curr_intersection[j].endTime.isSameOrBefore(
          current_time_ranges[k].startTime,
          'minutes'
        )
      ) {
        j++;
        continue;
      }

      //non disjoint case 1
      else if (
        current_time_ranges[k].endTime.isSameOrBefore(
          curr_intersection[j].endTime,
          'minutes'
        )
      ) {
        new_intersection.push({
          startTime: dayjs(
            Math.max(
              current_time_ranges[k].startTime.unix(),
              curr_intersection[j].startTime.unix()
            ) * 1000
          ),
          endTime: current_time_ranges[k].endTime
        });
        k++;
        continue;
      } else if (
        current_time_ranges[k].startTime.isSameOrBefore(
          curr_intersection[j].endTime,
          'minutes'
        )
      ) {
        new_intersection.push({
          startTime: current_time_ranges[k].startTime,
          endTime: dayjs(
            Math.min(
              current_time_ranges[k].endTime.unix(),
              curr_intersection[j].endTime.unix()
            ) * 1000
          )
        });
        j++;
      } else {
        // console.log('fnkewjjkfewnkj');
      }
    }
    curr_intersection = [...new_intersection];
  }

  return curr_intersection.map((t) => ({
    startTime: t.startTime.toISOString(),
    endTime: t.endTime.toISOString()
  }));
};

//pausing interviewers
// disjoint

// its a place we can do  optimize
const subtractpauseTimeFromFreeTimeRange = (inters: FuncParams) => {
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
