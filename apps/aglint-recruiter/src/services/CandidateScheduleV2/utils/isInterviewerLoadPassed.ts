import {
  CalConflictType,
  InterviewSessionApiRespType,
  schedulingSettingType,
} from '@aglint/shared-types';
import { Dayjs } from 'dayjs';

import { DBDetailsType } from '../types';
import { userTzDayjs } from './userTzDayjs';

export const isIntervLoadPassed = (
  current_day: Dayjs,
  db_details: DBDetailsType,
  int_email: string,
  int_schedule_setting: schedulingSettingType,
  plan_comb: InterviewSessionApiRespType[],
): {
  type: CalConflictType;
  is_passed: boolean;
  week_load_density: number;
  day_load_density: number;
} => {
  const curr_week_start_day = current_day.startOf('week');
  const curr_week_end_day = current_day.endOf('week');
  const int_meetings = db_details.ints_schd_meetings.get(int_email);
  const curr_week_meetings = int_meetings.filter((meet) => {
    const meet_date = userTzDayjs(meet.meeting_date).tz(
      int_schedule_setting.timeZone.tzCode,
    );
    return (
      meet_date.isSameOrAfter(curr_week_start_day, 'date') &&
      meet_date.isSameOrBefore(curr_week_end_day, 'date')
    );
  });

  console.log(curr_week_meetings);

  const slot_int_sessions = plan_comb.filter((sess) =>
    sess.qualifiedIntervs.find((int) => int.email === int_email),
  );
  const curr_slot_load = {
    total_interview: slot_int_sessions.length,
    total_duration: slot_int_sessions.reduce((sum, curr) => {
      return sum + curr.duration;
    }, 0),
  };
  const weekly_load = {
    total_interview: curr_week_meetings.reduce((sum, curr) => {
      return sum + curr.meeting_cnt;
    }, 0),
    total_duration: curr_week_meetings.reduce((sum, curr) => {
      return sum + curr.meeting_duration;
    }, 0),
  };
  const curr_day_meetings = int_meetings.filter((meet) => {
    const meet_date = userTzDayjs(meet.meeting_date).tz(
      int_schedule_setting.timeZone.tzCode,
    );
    return meet_date.isSame(current_day, 'day');
  });
  const day_load = {
    total_interview: curr_day_meetings.reduce((sum, curr) => {
      return sum + curr.meeting_cnt;
    }, 0),
    total_duration: curr_day_meetings.reduce((sum, curr) => {
      return sum + curr.meeting_duration;
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

  console.log(int_email);
  console.log(day_load);
  console.log(weekly_load);
  const int_day_load_density = day_load.total_interview / day_limit.value;
  const int_week_load_density = weekly_load.total_interview / week_limit.value;
  const hrs_day_load_density = day_load.total_duration / day_limit.value;
  const hrs_week_load_density = weekly_load.total_duration / week_limit.value;
  console.log(int_week_load_density);
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
