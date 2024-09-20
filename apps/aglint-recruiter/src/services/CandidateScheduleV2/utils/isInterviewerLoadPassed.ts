/* eslint-disable security/detect-object-injection */
import {
  type CalConflictType,
  type InterviewSessionApiRespType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { type Dayjs } from 'dayjs';

import { type ScheduleApiDetails } from '../types';

type LoadType = {
  total_interview: number;
  total_duration: number;
};

export const isIntervLoadPassed = (
  current_day: Dayjs,
  db_details: ScheduleApiDetails,
  inter_id: string,
  int_schedule_setting: schedulingSettingType,
  plan_comb: InterviewSessionApiRespType[],
): {
  type: CalConflictType;
  is_passed: boolean;
  week_load_density: number;
  day_load_density: number;
} => {
  const int_tz = int_schedule_setting.timeZone.tzCode;
  const curr_week_start_day = current_day
    .tz(int_tz)
    .startOf('week')
    .startOf('day');

  const curr_week_meetings_obj =
    db_details.ints_schd_meetings[inter_id][curr_week_start_day.format()];

  const weekly_load: LoadType = {
    total_interview: 0,
    total_duration: 0,
  };
  const day_load: LoadType = {
    total_interview: 0,
    total_duration: 0,
  };

  for (const [curr_date, val] of Object.entries(curr_week_meetings_obj || {})) {
    weekly_load.total_duration += val.meeting_duration;
    weekly_load.total_interview += val.meeting_cnt;
    if (curr_date === current_day.tz(int_tz).format()) {
      day_load.total_duration += val.meeting_duration;
      day_load.total_interview += val.meeting_cnt;
    }
  }
  const slot_int_sessions = plan_comb.filter((sess) =>
    sess.qualifiedIntervs.find((int) => int.user_id === inter_id),
  );
  const curr_slot_load = {
    total_interview: slot_int_sessions.length,
    total_duration: slot_int_sessions.reduce((sum, curr) => {
      return sum + curr.duration;
    }, 0),
  };

  // add current slot slot to both weekly load and day load
  weekly_load.total_interview += curr_slot_load.total_interview;
  weekly_load.total_duration += curr_slot_load.total_duration;
  day_load.total_interview += curr_slot_load.total_interview;
  day_load.total_duration += curr_slot_load.total_duration;
  day_load.total_duration /= 60;
  weekly_load.total_duration /= 60;
  const week_limit = int_schedule_setting.interviewLoad.weeklyLimit;
  const day_limit = int_schedule_setting.interviewLoad.dailyLimit;

  const int_day_load_density = day_load.total_interview / day_limit.value;
  const int_week_load_density = weekly_load.total_interview / week_limit.value;
  const hrs_day_load_density = day_load.total_duration / day_limit.value;
  const hrs_week_load_density = weekly_load.total_duration / week_limit.value;
  if (week_limit.type === 'Hours') {
    if (week_limit.value >= weekly_load.total_duration) {
      if (day_limit.type === 'Hours') {
        return {
          type: 'day_load_reached',
          is_passed: day_limit.value >= day_load.total_duration,
          day_load_density: hrs_day_load_density,
          week_load_density: hrs_week_load_density,
        };
      } else {
        return {
          type: 'day_load_reached',
          is_passed: day_limit.value >= day_load.total_interview,
          day_load_density: int_day_load_density,
          week_load_density: hrs_week_load_density,
        };
      }
    } else {
      return {
        type: 'week_load_reached',
        is_passed: false,
        day_load_density:
          day_limit.type === 'Hours'
            ? hrs_day_load_density
            : int_day_load_density,
        week_load_density: hrs_week_load_density,
      };
    }
  } else if (week_limit.type === 'Interviews') {
    if (week_limit.value >= weekly_load.total_interview) {
      if (day_limit.type === 'Hours') {
        return {
          type: 'day_load_reached',
          is_passed: day_limit.value >= day_load.total_duration,
          day_load_density: day_load.total_duration / day_limit.value,
          week_load_density: int_week_load_density,
        };
      } else {
        return {
          type: 'day_load_reached',
          is_passed: day_limit.value >= day_load.total_interview,
          day_load_density: day_load.total_interview / day_limit.value,
          week_load_density: int_week_load_density,
        };
      }
    } else {
      return {
        type: 'week_load_reached',
        is_passed: false,
        week_load_density: int_week_load_density,
        day_load_density:
          day_limit.type === 'Hours'
            ? hrs_day_load_density
            : int_day_load_density,
      };
    }
  }
};
