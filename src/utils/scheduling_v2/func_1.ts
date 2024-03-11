import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Import plugin for localized formats
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import { cloneDeep } from 'lodash';

import {
  CompServiceKeyCred,
  InterDetailsType,
  IntervMeta,
  TimeDurationDayjsType,
  TimeDurationType
} from './types';
import {
  fetchCalenderEvents,
  fetchCalenderEventsCompanyCred,
  refreshTokenIfNeeded
} from './utils';
import { CalenderEvent } from '../schedule-utils/types';

export const findInterviewersEvents = async (
  company_cred: CompServiceKeyCred,
  ints_meta: IntervMeta[],
  start_date: string,
  end_date: string
) => {
  const promiseArr = ints_meta.map(async (int) => {
    const inter_start_time = dayjs(start_date)
      .tz(int.shedule_settings.timeZone.tzCode)
      .startOf('day')
      .toISOString();
    const inter_end_time = dayjs(end_date)
      .tz(int.shedule_settings.timeZone.tzCode)
      .endOf('day')
      .toISOString();
    let newInt: InterDetailsType = {
      ...int,
      events: [],
      freeTimes: [],
      isCalenderConnected: false
    };
    try {
      if (newInt.tokens) {
        let tokens_date = await refreshTokenIfNeeded(
          newInt.tokens,
          int.interviewer_id
        );

        const calenderEvents = await fetchCalenderEvents(
          tokens_date.access_token,
          tokens_date.refresh_token,
          inter_start_time,
          inter_end_time
        );
        newInt.events = calenderEvents;
      } else {
        newInt.events = await fetchCalenderEventsCompanyCred(
          company_cred,
          newInt.email,
          inter_start_time,
          inter_end_time
        );
      }
      newInt.isCalenderConnected = true;
    } catch (error) {
      newInt.isCalenderConnected = false;
    }

    return newInt;
  });

  let intervs_details_with_events = await Promise.all(promiseArr);

  return intervs_details_with_events;
};

// each interviewer free times
export const findEachInterviewerFreeTimes = async (
  company_cred: CompServiceKeyCred,
  ints_meta: IntervMeta[],
  start_date: string,
  end_date: string
) => {
  const intervs_details_with_events = await findInterviewersEvents(
    company_cred,
    ints_meta,
    start_date,
    end_date
  );
  const updated_intervs_details = cloneDeep(intervs_details_with_events);
  for (let interv of updated_intervs_details) {
    if (!interv.isCalenderConnected) continue;
    interv.freeTimes = findInterviewerFreeTime(
      interv,
      dayjs(start_date),
      dayjs(end_date)
    );
  }
  return updated_intervs_details;
};

const findInterviewerFreeTime = (
  interviewer: InterDetailsType,
  start_date: Dayjs,
  end_date: Dayjs
) => {
  const findFreeTimeForTheDay = (current_day: Dayjs): TimeDurationType[] => {
    //is current day holiday
    if (
      interviewer.shedule_settings.totalDaysOff.find((holiday: string) =>
        current_day.isSame(dayjs(holiday, 'DD MMM YYYY'), 'date')
      )
    ) {
      return [];
    }

    const work_day = interviewer.shedule_settings.workingHours.find(
      (day) => current_day.format('dddd').toLowerCase() === day.day
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
          interviewer.shedule_settings.timeZone.tzCode
        ),
        endTime: chageTimeInDay(
          current_day,
          work_day.timeRange.endTime,
          interviewer.shedule_settings.timeZone.tzCode
        )
      }
    ];

    let day_free_times: TimeDurationType[] = [];

    day_free_times = minusEventsTimeInWorkHours(
      work_time_duration,
      interviewer.events.filter((cal_event) => {
        return (
          current_day.isSame(dayjs(cal_event.start.dateTime), 'date') ||
          current_day.isSame(dayjs(cal_event.end.dateTime), 'date')
        );
      })
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
  const new_time = current_day
    .hour(Number(hours))
    .minute(Number(minutes))
    .tz(timeZone)
    .toISOString();

  return new_time;
};

const minusEventsTimeInWorkHours = (
  work_hours_range: TimeDurationType[],
  calend_events: CalenderEvent[]
): TimeDurationType[] => {
  const work_hours = cloneDeep(work_hours_range);

  if (calend_events.length === 0) {
    return work_hours;
  }

  const work_hr_chunks: TimeDurationDayjsType[] = work_hours_range.map(
    (work) => {
      return {
        endTime: dayjs(work.endTime),
        startTime: dayjs(work.startTime)
      };
    }
  );
  const cal_events_times: TimeDurationDayjsType[] = calend_events
    .map((ev) => {
      return {
        startTime: dayjs(ev.start.dateTime),
        endTime: dayjs(ev.end.dateTime)
      };
    })
    .sort((e1, e2) => {
      return e1.startTime.diff(e2.startTime);
    });

  const free_times: TimeDurationType[] = [];

  for (let work_hour of work_hr_chunks) {
    let currtime = work_hour.startTime;
    let eventIdx = 0;
    while (
      currtime.isBefore(work_hour.endTime) &&
      eventIdx < cal_events_times.length
    ) {
      let cal_event = cal_events_times[Number(eventIdx)];
      if (currtime.isBefore(cal_event.startTime)) {
        // current time comes before cal_event
        //gap betwwen curr time and cal event
        let free_time: TimeDurationType = {
          startTime: currtime.toISOString(),
          endTime: cal_event.startTime.toISOString()
        };
        free_times.push(free_time);
        currtime = cal_event.endTime;
      } else if (cal_event.startTime.isAfter(currtime)) {
        // don know this case  may be not required ??
        // currtime = cal_event.endTime;
      } else if (
        cal_event.endTime.isAfter(work_hour.startTime) &&
        currtime.isAfter(cal_event.startTime)
      ) {
        // event is overlapping on previous event
        currtime = cal_event.endTime;
      }
      eventIdx++;
    }

    if (currtime.isBefore(work_hour.endTime)) {
      let free_time: TimeDurationType = {
        startTime: currtime.toISOString(),
        endTime: work_hour.endTime.toISOString()
      };
      free_times.push(free_time);
    }
  }
  return free_times;
};
