import {
  type APIOptions,
  type InterDayHolidayOff,
  type InterDayWorkHr,
  type InterDetailsType,
  type TimeDurationDayjsType,
  type TimeDurationType,
} from '@aglint/shared-types';
import { CApiError, dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import { type Dayjs } from 'dayjs';

import { type ScheduleApiDetails } from '../types';
import {
  convertTimeDurStrToDayjsChunk,
  dayjsMax,
  dayjsMin,
  isTimeChunksOverLapps,
} from './time_range_utils';

// one interview free time
export const findInterviewerWorkHrFreeTime = (
  interviewer: InterDetailsType,
  api_details: ScheduleApiDetails,
  api_options: APIOptions,
) => {
  const start_date: Dayjs = api_details.schedule_dates.user_start_date_js;
  const end_date: Dayjs = api_details.schedule_dates.user_end_date_js;
  const work_hrs: InterDayWorkHr = {};
  const holidays: InterDayHolidayOff = {};
  const day_offs: InterDayHolidayOff = {};
  let current_date = start_date.startOf('day');
  const upd_inter = { ...interviewer };
  while (!current_date.isAfter(end_date, 'day')) {
    const { curr_day_holidays, curr_day_offs, work_time_duration } =
      findWorkTimeForTheDay(
        interviewer,
        current_date,
        api_details,
        api_options,
      );

    work_hrs[current_date.format()] = [...work_time_duration];
    holidays[current_date.format()] = [...curr_day_holidays];
    day_offs[current_date.format()] = [...curr_day_offs];
    if (!upd_inter.cal_date_events[current_date.startOf('day').format()]) {
      upd_inter.cal_date_events[current_date.startOf('day').format()] = [];
    }
    current_date = current_date.add(1, 'day');
  }
  upd_inter.work_hours = work_hrs;
  upd_inter.holiday = holidays;
  upd_inter.day_off = day_offs;
  return upd_inter;
};

/**
 *
 * @param current_day // in interviewer_tz
 * @param int_schedule_setting
 * @returns considers holidays, dayOffs,
 */
const getCurrDayWorkingHours = (
  current_day: Dayjs,
  interv: InterDetailsType,
  api_details: ScheduleApiDetails,
) => {
  const { int_schedule_setting } = interv;
  const work_day = int_schedule_setting.workingHours.find(
    (day) => current_day.format('dddd').toLowerCase() === day.day,
  );
  if (!work_day) {
    throw new CApiError('SERVER_ERROR', 'Invalid working day');
  }
  const work_hour = {
    startTime: ScheduleUtils.setTimeInDay(
      current_day.format(),
      work_day.timeRange.startTime,
      int_schedule_setting.timeZone.tzCode,
    ).format(),
    endTime: ScheduleUtils.setTimeInDay(
      current_day.format(),
      work_day.timeRange.endTime,
      int_schedule_setting.timeZone.tzCode,
    ).format(),
  };
  const holiday: TimeDurationType = {
    startTime: current_day.startOf('day').tz(api_details.req_user_tz).format(),
    endTime: current_day.endOf('day').tz(api_details.req_user_tz).format(),
  };
  const day_off: TimeDurationType = {
    ...holiday,
  };

  const is_holiday = api_details.comp_schedule_setting.totalDaysOff.find(
    (holiday) =>
      current_day.isSame(
        dayjsLocal(holiday.date, 'DD MMM YYYY').tz(
          api_details.comp_schedule_setting.timeZone.tzCode,
        ),
        'date',
      ),
  );

  if (is_holiday)
    return {
      holiday: holiday,
      work_hour: work_hour,
      day_off: null,
    };

  // is day week off
  if (!work_day.isWorkDay) {
    return {
      holiday: null,
      work_hour: work_hour,
      day_off,
    };
  }

  return {
    holiday: null,
    day_off: null,
    work_hour,
  };
};

const findWorkTimeForTheDay = (
  interviewer: InterDetailsType,
  current_day: Dayjs,
  api_details: ScheduleApiDetails,
  api_options: APIOptions,
) => {
  const int_timezone = interviewer.int_schedule_setting.timeZone.tzCode;
  const cand_time: TimeDurationDayjsType = {
    startTime: current_day.set('hour', api_options.cand_start_time),
    endTime: current_day.set('hour', api_options.cand_end_time),
  };
  const day1_interviewer_time: TimeDurationDayjsType & { day: string } = {
    startTime: dayjsLocal(current_day.startOf('day').toISOString()).tz(
      int_timezone,
    ),
    endTime: dayjsLocal(current_day.startOf('day').toISOString())
      .tz(int_timezone)
      .endOf('day'),
    day: dayjsLocal(current_day.startOf('day').format())
      .tz(int_timezone)
      .format('dddd'),
  };

  const day2_interviewer_time: TimeDurationDayjsType & { day: string } = {
    startTime: dayjsLocal(current_day.endOf('day').toISOString())
      .tz(int_timezone)
      .startOf('day'),
    endTime: dayjsLocal(current_day.endOf('day').toISOString()).tz(
      int_timezone,
    ),
    day: dayjsLocal(current_day.endOf('day').format())
      .tz(int_timezone)
      .format('dddd'),
  };

  const day1_details = getCurrDayWorkingHours(
    day1_interviewer_time.startTime,
    interviewer,
    api_details,
  );

  const work_time_duration: TimeDurationType[] = [];
  const curr_day_holidays: TimeDurationType[] = [];
  const curr_day_offs: TimeDurationType[] = [];
  if (day1_details.work_hour) {
    const curr_day_work_hrs = getWorkHourFromIntAvil(
      {
        startTime: dayjsLocal(day1_details.work_hour.startTime).tz(
          int_timezone,
        ),
        endTime: dayjsLocal(day1_details.work_hour.endTime).tz(int_timezone),
      },
      day1_interviewer_time,
    );
    const chunk_js = convertTimeDurStrToDayjsChunk(curr_day_work_hrs);

    if (isTimeChunksOverLapps(chunk_js, cand_time)) {
      curr_day_work_hrs.startTime = dayjsMax(
        chunk_js.startTime,
        cand_time.startTime,
      )
        .tz(api_details.req_user_tz)
        .format();
      curr_day_work_hrs.endTime = dayjsMin(chunk_js.endTime, cand_time.endTime)
        .tz(api_details.req_user_tz)
        .format();
      work_time_duration.push({
        ...curr_day_work_hrs,
      });
    }
  }

  if (day1_details.holiday) {
    curr_day_holidays.push({
      ...day1_details.holiday,
    });
  }
  if (day1_details.day_off) {
    curr_day_offs.push({
      ...day1_details.day_off,
    });
  }

  // if candidate and interviewr are in same time zone
  if (day1_interviewer_time.day !== day2_interviewer_time.day) {
    const day2_work_hours = getCurrDayWorkingHours(
      day2_interviewer_time.startTime,
      interviewer,
      api_details,
    );
    if (day2_work_hours.work_hour) {
      const curr_day_work_hrs = getWorkHourFromIntAvil(
        {
          startTime: dayjsLocal(day2_work_hours.work_hour.startTime).tz(
            int_timezone,
          ),
          endTime: dayjsLocal(day2_work_hours.work_hour.endTime).tz(
            int_timezone,
          ),
        },
        day2_interviewer_time,
      );
      const chunk_js = convertTimeDurStrToDayjsChunk(curr_day_work_hrs);
      if (isTimeChunksOverLapps(chunk_js, cand_time)) {
        curr_day_work_hrs.startTime = dayjsMax(
          chunk_js.startTime,
          cand_time.startTime,
        )
          .tz(api_details.req_user_tz)
          .format();
        curr_day_work_hrs.endTime = dayjsMin(
          chunk_js.endTime,
          cand_time.endTime,
        )
          .tz(api_details.req_user_tz)
          .format();
        work_time_duration.push({
          ...curr_day_work_hrs,
        });
      }
    }
    if (day2_work_hours.holiday) {
      curr_day_holidays.push({
        ...day2_work_hours.holiday,
      });
    }
    if (day2_work_hours.day_off) {
      curr_day_offs.push({
        ...day2_work_hours.day_off,
      });
    }
  }
  return { work_time_duration, curr_day_holidays, curr_day_offs };
};

const getWorkHourFromIntAvil = (
  int_work_hour: TimeDurationDayjsType,
  int_avail: TimeDurationDayjsType,
): TimeDurationType => {
  return {
    startTime: int_work_hour.startTime.isSameOrAfter(int_avail.startTime)
      ? int_work_hour.startTime.format()
      : int_avail.startTime.format(),
    endTime: int_work_hour.endTime.isSameOrBefore(int_avail.endTime)
      ? int_work_hour.endTime.format()
      : int_avail.endTime.format(),
  };
};
