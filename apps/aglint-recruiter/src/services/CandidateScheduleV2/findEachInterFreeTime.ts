import {
  APIFindAvailability,
  APIOptions,
  holidayType,
  InterDayFreeTime,
  InterDayWorkHr,
  InterDetailsType,
  TimeDurationDayjsType,
  TimeDurationType,
} from '@aglint/shared-types';
import { Dayjs } from 'dayjs';
import { cloneDeep } from 'lodash';

import { ScheduleUtils } from './ScheduleUtils';
import { DBDetailsType } from './types';
import { getInterviewerBlockedTimes } from './utils/isEventFreeTime';
import {
  dayjsMax,
  isTimeChunksEnclosed,
  isTimeChunksLeftOverlapped,
  isTimeChunksOverLapps,
} from './utils/time_range_utils';
import { userTzDayjs } from './utils/userTzDayjs';

// private util functions
/**
 * @param ints_details
 * @param start_date
 * @param end_date
 * @param current_int_slot
 * @returns returns array of free time chunks for each interviewer for every given date bw the daterange
 */
//
export const findEachInterviewerFreeTimes = (
  ints_details: InterDetailsType[],
  api_payload: Omit<APIFindAvailability, 'options'>,
  api_options: APIOptions,
  db_details: DBDetailsType,
  start_date: string,
  end_date: string,
) => {
  // one interview free time
  const findInterviewerWorkHrFreeTime = (
    interviewer: InterDetailsType,
    start_date: Dayjs,
    end_date: Dayjs,
  ) => {
    let free_times: InterDayFreeTime[] = [];
    let work_hrs: InterDayWorkHr[] = [];
    let current_date = start_date;

    while (!current_date.isAfter(end_date, 'day')) {
      const work_time_duration = findWorkTimeForTheDay(
        interviewer,
        current_date,
      );
      let curr_day_free_times = findFreeTimeForTheDay(
        interviewer,
        work_time_duration,
        current_date,
      );
      work_hrs.push({
        curr_date: current_date.format(),
        work_hrs: work_time_duration,
      });
      free_times.push({
        curr_date: current_date.format(),
        free_times: curr_day_free_times,
      });
      current_date = current_date.add(1, 'day');
    }

    return { work_hrs, free_times };
  };

  /**
   *
   * @param current_day
   * @param int_schedule_setting
   * @returns considers holidays, dayOffs,
   */
  const getCurrDayWorkingHours = (
    current_day: Dayjs,
    interv: InterDetailsType,
  ): TimeDurationType => {
    const { int_schedule_setting } = interv;
    let curr_user_time = userTzDayjs().tz(int_schedule_setting.timeZone.tzCode);
    // current day is before actual curr day
    if (current_day.isBefore(curr_user_time, 'day')) {
      return null;
    }
    const is_holiday = db_details.comp_schedule_setting.totalDaysOff.find(
      (holiday: holidayType) =>
        current_day.isSame(
          userTzDayjs(holiday.date, 'DD MMM YYYY').tz(
            db_details.comp_schedule_setting.timeZone.tzCode,
          ),
          'date',
        ),
    );

    if (is_holiday) return null;
    const work_day = int_schedule_setting.workingHours.find(
      (day) => current_day.format('dddd').toLowerCase() === day.day,
    );
    // is day week off
    if (!work_day.isWorkDay) {
      return null;
    }

    let work_hour = {
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

    if (api_options.include_conflicting_slots.override_work_hr_start) {
      work_hour.startTime = current_day
        .tz(int_schedule_setting.timeZone.tzCode)
        .set(
          'hour',
          api_options.include_conflicting_slots.override_work_hr_start,
        )
        .format();
    }

    if (api_options.include_conflicting_slots.override_work_hr_end) {
      work_hour.endTime = current_day
        .tz(int_schedule_setting.timeZone.tzCode)
        .set('hour', api_options.include_conflicting_slots.override_work_hr_end)
        .format();
    }

    return work_hour;
  };

  const findFreeTimeForTheDay = (
    interviewer: InterDetailsType,
    work_time_duration: TimeDurationType[],
    current_day: Dayjs,
  ) => {
    if (work_time_duration.length == 0) {
      return [];
    }
    let current_day_blocked_times = getInterviewerBlockedTimes(
      db_details.comp_schedule_setting,
      interviewer.events,
      api_payload.candidate_tz,
    );

    let nearest_curr_time = ScheduleUtils.getNearestCurrTime(
      interviewer.int_schedule_setting.timeZone.tzCode,
    );

    if (current_day.isSame(nearest_curr_time, 'day')) {
      current_day_blocked_times.push({
        startTime: userTzDayjs(current_day),
        endTime: userTzDayjs(nearest_curr_time),
      });
    }

    let day_free_times: TimeDurationType[] = [];
    day_free_times = minusBlockedTimeInWorkHours(
      work_time_duration,
      current_day_blocked_times,
    );
    return day_free_times;
  };

  const findWorkTimeForTheDay = (
    interviewer: InterDetailsType,
    current_day: Dayjs,
  ): TimeDurationType[] => {
    const int_timezone = interviewer.int_schedule_setting.timeZone.tzCode;
    const day1_interviewer_time: TimeDurationDayjsType & { day: string } = {
      startTime: userTzDayjs(current_day.startOf('day').toISOString()).tz(
        int_timezone,
      ),
      endTime: userTzDayjs(current_day.startOf('day').toISOString())
        .tz(int_timezone)
        .endOf('day'),
      day: userTzDayjs(current_day.startOf('day').format())
        .tz(int_timezone)
        .format('dddd'),
    };

    const day2_interviewer_time: TimeDurationDayjsType & { day: string } = {
      startTime: userTzDayjs(current_day.endOf('day').toISOString())
        .tz(int_timezone)
        .startOf('day'),
      endTime: userTzDayjs(current_day.endOf('day').toISOString()).tz(
        int_timezone,
      ),
      day: userTzDayjs(current_day.endOf('day').format())
        .tz(int_timezone)
        .format('dddd'),
    };

    let work_time_duration: TimeDurationType[] = [];
    let day1_work_hours = getCurrDayWorkingHours(
      day1_interviewer_time.startTime,
      interviewer,
    );
    let day2_work_hours = getCurrDayWorkingHours(
      day2_interviewer_time.startTime,
      interviewer,
    );

    if (!day1_work_hours && !day2_work_hours) {
      return [];
    }

    if (day1_work_hours) {
      work_time_duration.push({
        ...getWorkHourFromIntAvil(
          {
            startTime: userTzDayjs(day1_work_hours.startTime).tz(int_timezone),
            endTime: userTzDayjs(day1_work_hours.endTime).tz(int_timezone),
          },
          day1_interviewer_time,
        ),
      });
    }

    // if candidate and interviewr are in same time zone
    if (
      day1_interviewer_time.day !== day2_interviewer_time.day &&
      day2_work_hours
    ) {
      work_time_duration.push({
        ...getWorkHourFromIntAvil(
          {
            startTime: userTzDayjs(day2_work_hours.startTime).tz(int_timezone),
            endTime: userTzDayjs(day2_work_hours.endTime).tz(int_timezone),
          },
          day2_interviewer_time,
        ),
      });
    }

    return work_time_duration;
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
  const minusBlockedTimeInWorkHours = (
    work_hours_range: TimeDurationType[],
    curr_day_blocked_times: TimeDurationDayjsType[],
  ): TimeDurationType[] => {
    const sorted_blocked_times: TimeDurationDayjsType[] =
      curr_day_blocked_times.sort((e1, e2) => {
        return e1.startTime.diff(e2.startTime);
      });

    const getFreeTimeChunkForWorkHrChunk = (
      workhr_chunk: TimeDurationDayjsType,
    ): TimeDurationDayjsType[] => {
      const curr_blocked_times = sorted_blocked_times.filter(
        (blocked_chunk) => {
          return isTimeChunksOverLapps(blocked_chunk, workhr_chunk);
        },
      );

      if (curr_blocked_times.length === 0) {
        return [{ ...workhr_chunk }];
      }

      let prev_blocked_chunk: TimeDurationDayjsType = {
        startTime: curr_blocked_times[0].startTime,
        endTime: curr_blocked_times[0].endTime,
      };

      let free_time_chunks: TimeDurationDayjsType[] = [];

      if (
        prev_blocked_chunk.startTime.isAfter(workhr_chunk.startTime, 'minutes')
      ) {
        free_time_chunks.push({
          startTime: workhr_chunk.startTime,
          endTime: prev_blocked_chunk.startTime,
        });
      }
      for (let curr_blocked_chunk of curr_blocked_times.slice(1)) {
        if (!isTimeChunksOverLapps(prev_blocked_chunk, curr_blocked_chunk)) {
          free_time_chunks.push({
            startTime: prev_blocked_chunk.endTime,
            endTime: curr_blocked_chunk.startTime,
          });

          prev_blocked_chunk = {
            ...curr_blocked_chunk,
          };
        } else if (
          isTimeChunksLeftOverlapped(prev_blocked_chunk, curr_blocked_chunk)
        ) {
          prev_blocked_chunk.endTime = dayjsMax(
            prev_blocked_chunk.endTime,
            curr_blocked_chunk.endTime,
          );
        } else if (
          isTimeChunksEnclosed(prev_blocked_chunk, curr_blocked_chunk)
        ) {
          // nothing to do
        }
      }
      if (
        prev_blocked_chunk.endTime.isBefore(workhr_chunk.endTime, 'minutes')
      ) {
        free_time_chunks.push({
          startTime: prev_blocked_chunk.endTime,
          endTime: workhr_chunk.endTime,
        });
      }

      return free_time_chunks;
    };

    const work_hr_chunks: TimeDurationDayjsType[] = work_hours_range
      .map((work) => {
        return {
          startTime: userTzDayjs(work.startTime).tz(api_payload.candidate_tz),
          endTime: userTzDayjs(work.endTime).tz(api_payload.candidate_tz),
        };
      })
      .sort((e1, e2) => {
        return e1.startTime.diff(e2.startTime);
      });

    let free_times_dayjs: TimeDurationDayjsType[] = [];

    for (let workhr_chunk of work_hr_chunks) {
      const curr_free_chunks = getFreeTimeChunkForWorkHrChunk(workhr_chunk);
      free_times_dayjs = [...free_times_dayjs, ...curr_free_chunks];
    }

    const free_times: TimeDurationType[] = free_times_dayjs.map((chunk) => ({
      startTime: chunk.startTime.format(),
      endTime: chunk.endTime.format(),
    }));

    return free_times;
  };

  const updated_intervs_details = cloneDeep(ints_details);
  for (let interv of updated_intervs_details) {
    if (!interv.isCalenderConnected) {
      interv.freeTimes = [];
    } else {
      const { free_times, work_hrs } = findInterviewerWorkHrFreeTime(
        interv,
        userTzDayjs(start_date).tz(api_payload.candidate_tz).startOf('day'),
        userTzDayjs(end_date).tz(api_payload.candidate_tz).endOf('day'),
      );
      interv.freeTimes = free_times;
      interv.work_hours = work_hrs;
    }
  }
  return updated_intervs_details;
};
