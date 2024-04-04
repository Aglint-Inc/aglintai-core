/* eslint-disable security/detect-object-injection */
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { cloneDeep } from 'lodash';

import { holidayType } from '@/src/components/Scheduling/Settings/types';

import { GoogleCalender } from '../integrations/google-calender';
import {
  CompServiceKeyCred,
  InterDetailsType,
  IntervMeta,
  TimeDurationDayjsType,
  TimeDurationType,
} from './types';
import { convertDayjsToUserTimeZoneDate } from './utils';

// returns users calender events on there timezone ,given respective start_date and end_date
export const findInterviewersEvents = async (
  company_cred: CompServiceKeyCred,
  ints_meta: IntervMeta[],
  dayjs_start_date: Dayjs,
  dayjs_end_date: Dayjs,
  user_tz,
) => {
  const start_date = convertDayjsToUserTimeZoneDate(
    dayjs_start_date,
    user_tz,
    true,
  );
  const end_date = convertDayjsToUserTimeZoneDate(
    dayjs_end_date,
    user_tz,
    false,
  );
  const promiseArr = ints_meta.map(async (int) => {
    let newInt: InterDetailsType = {
      ...int,
      events: [],
      freeTimes: [],
      isCalenderConnected: false,
    };
    try {
      const google_cal = new GoogleCalender(
        {
          recruiter: {
            email: int.email,
            schedule_auth: int.tokens,
            user_id: int.interviewer_id,
          },
          company_cred: company_cred,
        },
        null,
      );
      await google_cal.authorizeUser();
      newInt.events = await google_cal.getAllCalenderEvents(
        start_date,
        end_date,
      );
      newInt.isCalenderConnected = true;
    } catch (error) {
      newInt.isCalenderConnected = false;
    }
    return newInt;
  });

  let intervs_details_with_events = await Promise.all(promiseArr);
  return intervs_details_with_events;
};

// returns users free time ranges on there timezone, given respective start_date and end_date
export const findEachInterviewerFreeTimes = (
  ints_details: InterDetailsType[],
  start_date: string,
  end_date: string,
) => {
  const updated_intervs_details = cloneDeep(ints_details);
  for (let interv of updated_intervs_details) {
    if (!interv.isCalenderConnected) {
      interv.freeTimes = [];
    } else {
      interv.freeTimes = findInterviewerFreeTime(
        interv,
        dayjs(start_date),
        dayjs(end_date),
      );
    }
  }
  return updated_intervs_details;
};

const findInterviewerFreeTime = (
  interviewer: InterDetailsType,
  start_date: Dayjs,
  end_date: Dayjs,
) => {
  const findFreeTimeForTheDay = (current_day: Dayjs): TimeDurationType[] => {
    //is current day holiday

    if (
      interviewer.shedule_settings.totalDaysOff.find((holiday: holidayType) =>
        current_day.isSame(dayjs(holiday.date, 'DD MMM YYYY'), 'date'),
      )
    ) {
      return [];
    }

    const work_day = interviewer.shedule_settings.workingHours.find(
      (day) => current_day.format('dddd').toLowerCase() === day.day,
    );

    // is day week off
    if (!work_day.isWorkDay) {
      return [];
    }

    //
    let work_time_duration: TimeDurationType[] = [
      {
        startTime: chageTimeInDay(
          current_day,
          work_day.timeRange.startTime,
          interviewer.shedule_settings.timeZone.tzCode,
        ),
        endTime: chageTimeInDay(
          current_day,
          work_day.timeRange.endTime,
          interviewer.shedule_settings.timeZone.tzCode,
        ),
      },
    ];

    let current_day_blocked_times: TimeDurationDayjsType[] = interviewer.events
      .filter((cal_event) => {
        let is_event_free_time = false;
        interviewer.shedule_settings.schedulingKeyWords.free.forEach(
          (key_word: string) => {
            if (
              cal_event.summary &&
              cal_event.summary.toLocaleLowerCase().includes(key_word)
            ) {
              is_event_free_time = true;
            }
          },
        );
        return (
          (current_day.isSame(dayjs(cal_event.start.dateTime), 'date') ||
            current_day.isSame(dayjs(cal_event.end.dateTime), 'date')) &&
          !is_event_free_time
        );
      })
      .map((ev) => {
        return {
          startTime: dayjs(ev.start.dateTime),
          endTime: dayjs(ev.end.dateTime),
        };
      });

    let curr_user_time = dayjs().tz(
      interviewer.shedule_settings.timeZone.tzCode,
    );

    if (current_day.isBefore(curr_user_time, 'day')) {
      return [];
    }
    if (current_day.isSame(curr_user_time, 'day')) {
      current_day_blocked_times.push({
        startTime: dayjs(current_day),
        endTime: dayjs(curr_user_time),
      });
    }

    let day_free_times: TimeDurationType[] = [];
    day_free_times = minusEventsTimeInWorkHours(
      work_time_duration,
      current_day_blocked_times,
    );
    return day_free_times;
  };

  let free_times: TimeDurationType[] = [];
  let current_date = start_date;

  while (!current_date.isAfter(end_date, 'day')) {
    let curr_day_free_times = findFreeTimeForTheDay(current_date);
    free_times = [...free_times, ...curr_day_free_times];
    current_date = current_date.add(1, 'day');
  }

  return free_times;
};

const chageTimeInDay = (current_day: Dayjs, time: string, timeZone: string) => {
  const [hours, minutes] = time.split(':');
  let userTime = current_day.tz(timeZone);
  userTime = userTime.set('hour', Number(hours));
  userTime = userTime.set('minutes', Number(minutes));

  return userTime.format();
};

const minusEventsTimeInWorkHours = (
  work_hours_range: TimeDurationType[],
  curr_day_blocked_times: TimeDurationDayjsType[],
): TimeDurationType[] => {
  const work_hours = cloneDeep(work_hours_range);
  if (curr_day_blocked_times.length === 0) {
    return work_hours;
  }

  const work_hr_chunks: TimeDurationDayjsType[] = work_hours_range
    .map((work) => {
      return {
        startTime: dayjs(work.startTime),
        endTime: dayjs(work.endTime),
      };
    })
    .sort((e1, e2) => {
      return e1.startTime.diff(e2.startTime);
    });
  const cal_events_times: TimeDurationDayjsType[] = curr_day_blocked_times.sort(
    (e1, e2) => {
      return e1.startTime.diff(e2.startTime);
    },
  );

  const free_times: TimeDurationType[] = [];

  let workhr_idx = 0;
  let cal_evt_idx = 0;
  let curr_freetime_chunk: TimeDurationDayjsType = {
    startTime: work_hr_chunks[0].startTime,
    endTime: work_hr_chunks[0].endTime,
  };

  while (
    workhr_idx < work_hr_chunks.length &&
    cal_evt_idx < cal_events_times.length
  ) {
    // case 1
    if (
      curr_freetime_chunk.startTime.isAfter(
        cal_events_times[cal_evt_idx].endTime,
        'minutes',
      )
    ) {
      cal_evt_idx++;
    }

    // case 2
    else if (
      curr_freetime_chunk.endTime.isSameOrBefore(
        cal_events_times[cal_evt_idx].startTime,
        'minutes',
      )
    ) {
      free_times.push({
        startTime: curr_freetime_chunk.startTime.format(),
        endTime: curr_freetime_chunk.endTime.format(),
      });
      workhr_idx++;
      if (workhr_idx < work_hr_chunks.length) {
        curr_freetime_chunk = {
          startTime: work_hr_chunks[workhr_idx].startTime,
          endTime: work_hr_chunks[workhr_idx].endTime,
        };
      }
    }

    // case 3
    else if (
      curr_freetime_chunk.startTime.isSameOrAfter(
        cal_events_times[cal_evt_idx].startTime,
      ) &&
      curr_freetime_chunk.endTime.isSameOrAfter(
        cal_events_times[cal_evt_idx].endTime,
      )
    ) {
      curr_freetime_chunk.startTime = cal_events_times[cal_evt_idx].endTime;
      cal_evt_idx++;
    }

    // case 4
    else if (
      curr_freetime_chunk.startTime.isSameOrBefore(
        cal_events_times[cal_evt_idx].startTime,
        'minutes',
      ) &&
      curr_freetime_chunk.endTime.isSameOrBefore(
        cal_events_times[cal_evt_idx].endTime,
        'minutes',
      )
    ) {
      free_times.push({
        startTime: curr_freetime_chunk.startTime.format(),
        endTime: cal_events_times[cal_evt_idx].startTime.format(),
      });
      workhr_idx++;
      if (workhr_idx < work_hr_chunks.length) {
        curr_freetime_chunk = {
          startTime: work_hr_chunks[workhr_idx].startTime,
          endTime: work_hr_chunks[workhr_idx].endTime,
        };
      }
      cal_evt_idx++;
    }

    // case 5
    else if (
      curr_freetime_chunk.startTime.isSameOrAfter(
        cal_events_times[cal_evt_idx].startTime,
        'minutes',
      ) &&
      curr_freetime_chunk.endTime.isSameOrBefore(
        cal_events_times[cal_evt_idx].endTime,
        'minutes',
      )
    ) {
      workhr_idx++;
      if (workhr_idx < work_hr_chunks.length) {
        curr_freetime_chunk = {
          startTime: work_hr_chunks[workhr_idx].startTime,
          endTime: work_hr_chunks[workhr_idx].endTime,
        };
      }
    }
    // case 6
    else if (
      curr_freetime_chunk.startTime.isBefore(
        cal_events_times[cal_evt_idx].startTime,
        'minutes',
      ) &&
      curr_freetime_chunk.endTime.isAfter(
        cal_events_times[cal_evt_idx].endTime,
        'minutes',
      )
    ) {
      free_times.push({
        startTime: curr_freetime_chunk.startTime.format(),
        endTime: cal_events_times[cal_evt_idx].startTime.format(),
      });
      curr_freetime_chunk.startTime = cal_events_times[cal_evt_idx].endTime;

      cal_evt_idx++;
    }

    // case 7
    else if (
      curr_freetime_chunk.startTime.isSame(
        cal_events_times[cal_evt_idx].startTime,
        'minutes',
      ) &&
      curr_freetime_chunk.endTime.isSame(
        cal_events_times[cal_evt_idx].endTime,
        'minutes',
      )
    ) {
      workhr_idx++;
      if (workhr_idx < work_hr_chunks.length) {
        curr_freetime_chunk = {
          startTime: work_hr_chunks[workhr_idx].startTime,
          endTime: work_hr_chunks[workhr_idx].endTime,
        };
      }
      cal_evt_idx++;
    }

    // if (
    //   cal_events_times[cal_evt_idx].startTime.isSameOrBefore(
    //     curr_freetime_chunk.startTime,
    //     'minutes',
    //   ) &&
    //   cal_events_times[cal_evt_idx].endTime.isSameOrBefore(
    //     curr_freetime_chunk.endTime,
    //     'minutes',
    //   )
    // ) {
    //   cal_evt_idx++;
    // }

    // if (
    //   cal_events_times[cal_evt_idx].startTime.isAfter(
    //     work_hr_chunks[workhr_idx].startTime,
    //     'minutes',
    //   ) &&
    //   cal_events_times[cal_evt_idx].endTime.isSameOrBefore(
    //     work_hr_chunks[workhr_idx].endTime,
    //     'minutes',
    //   )
    // ) {
    //   //
    // }
  }
  if (workhr_idx < work_hours_range.length) {
    free_times.push({
      startTime: curr_freetime_chunk.startTime.format(),
      endTime: curr_freetime_chunk.endTime.format(),
    });
    for (let i = workhr_idx + 1; i < work_hr_chunks.length; ++i) {
      free_times.push({
        startTime: work_hr_chunks[i].startTime.format(),
        endTime: work_hr_chunks[i].endTime.format(),
      });
    }
  }

  return free_times;
};
