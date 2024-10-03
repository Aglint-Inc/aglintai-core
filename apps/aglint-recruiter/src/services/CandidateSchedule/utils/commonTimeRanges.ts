/* eslint-disable security/detect-object-injection */

// NOTE:  FUNCTION NOT IN USE
import {
  type TimeDurationDayjsType,
  type TimeDurationType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';

import { type DayjsTimeRange, type FuncParams } from '../types';

export const findCommonTimeRangeUtil = (
  ints_meta: FuncParams[],
  resp_tz: string,
): TimeDurationType[] => {
  //TODO: rewrite the merging function for beeter understanding
  if (ints_meta.find((i) => i.time_ranges.length === 0)) return [];
  const int_sorted_range: DayjsTimeRange[] = ints_meta.map((i) => ({
    inter_id: i.inter_id,
    time_ranges: i.time_ranges
      .sort((time1, time2) => {
        return (
          dayjsLocal(time1.startTime).unix() -
          dayjsLocal(time2.startTime).unix()
        );
      })
      .map((t) => ({
        startTime: dayjsLocal(t.startTime),
        endTime: dayjsLocal(t.endTime),
      })),
  }));

  let curr_intersection: TimeDurationDayjsType[] =
    int_sorted_range[0].time_ranges;

  for (let i = 1; i < int_sorted_range.length; ++i) {
    const current_time_ranges = [...int_sorted_range[Number(i)].time_ranges];
    const new_intersection: TimeDurationDayjsType[] = [];
    let j = 0,
      k = 0;
    while (j < curr_intersection.length && k < current_time_ranges.length) {
      if (
        curr_intersection[j].startTime.isSameOrBefore(
          current_time_ranges[k].startTime,
          'minutes',
        ) &&
        curr_intersection[j].endTime.isSameOrAfter(
          current_time_ranges[k].endTime,
          'minutes',
        )
      ) {
        new_intersection.push({
          startTime: current_time_ranges[k].startTime,
          endTime: current_time_ranges[k].endTime,
        });
        k++;
        continue;
      }

      if (
        current_time_ranges[k].startTime.isSameOrBefore(
          curr_intersection[j].startTime,
          'minutes',
        ) &&
        current_time_ranges[k].endTime.isSameOrAfter(
          curr_intersection[j].endTime,
          'minutes',
        )
      ) {
        new_intersection.push({
          startTime: curr_intersection[j].startTime,
          endTime: curr_intersection[j].endTime,
        });
        j++;
        continue;
      }

      if (
        current_time_ranges[k].endTime.isSameOrBefore(
          curr_intersection[j].startTime,
          'minutes',
        )
      ) {
        // disjoint case 1
        k++;
      }
      // disjoint case 2
      else if (
        curr_intersection[j].endTime.isSameOrBefore(
          current_time_ranges[k].startTime,
          'minutes',
        )
      ) {
        j++;
        continue;
      }

      //non disjoint case 1
      else if (
        current_time_ranges[k].endTime.isSameOrBefore(
          curr_intersection[j].endTime,
          'minutes',
        )
      ) {
        new_intersection.push({
          startTime: dayjsLocal(
            Math.max(
              current_time_ranges[k].startTime.unix(),
              curr_intersection[j].startTime.unix(),
            ) * 1000,
          ),
          endTime: current_time_ranges[k].endTime,
        });
        k++;
        continue;
      } else if (
        current_time_ranges[k].startTime.isSameOrBefore(
          curr_intersection[j].endTime,
          'minutes',
        )
      ) {
        new_intersection.push({
          startTime: current_time_ranges[k].startTime,
          endTime: dayjsLocal(
            Math.min(
              current_time_ranges[k].endTime.unix(),
              curr_intersection[j].endTime.unix(),
            ) * 1000,
          ),
        });
        j++;
      } else {
        // console.log('fnkewjjkfewnkj');
      }
    }

    curr_intersection = [...new_intersection];
  }
  return curr_intersection.map((t) => ({
    startTime: dayjsLocal(t.startTime).tz(resp_tz).format(),
    endTime: dayjsLocal(t.endTime).tz(resp_tz).format(),
  }));
};