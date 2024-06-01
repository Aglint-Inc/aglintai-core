/* eslint-disable security/detect-object-injection */
import {
  CalConflictType,
  CompServiceKeyCred,
  InterDetailsType,
  schedulingSettingType,
  SessionInterviewerType,
} from '@aglint/shared-types';

import { getFullName } from '@/src/utils/jsonResume';

import { GoogleCalender } from '../../GoogleCalender/google-calender';
import { userTzDayjs } from './userTzDayjs';

export const fetchIntsCalEventsDetails = async (
  session_inters: SessionInterviewerType[],
  company_cred: CompServiceKeyCred,
  comp_schedule_setting: schedulingSettingType,
  start_date: string,
  end_date: string,
  cand_tz: string,
) => {
  const ints_meta: InterDetailsType[] = session_inters.map((i) => ({
    email: i.email,
    interviewer_id: i.user_id,
    name: getFullName(i.first_name, i.last_name),
    profile_img: i.profile_image,
    shedule_settings: i.scheduling_settings,
    all_events: [],
    tokens: i.schedule_auth as any,
    cal_date_events: {},
    freeTimes: {},
    int_schedule_setting: i.scheduling_settings,
    isCalenderConnected: false,
    work_hours: {},
    day_off: {},
    holiday: {},
  }));

  const getCalEventType = (cal_event_summary: string): CalConflictType => {
    const soft_conf_key_words =
      comp_schedule_setting.schedulingKeyWords.SoftConflicts.map((str) =>
        str.toLowerCase(),
      );
    const out_of_office_key_words =
      comp_schedule_setting.schedulingKeyWords.outOfOffice.map((str) =>
        str.toLowerCase(),
      );

    const is_soft_conflict = soft_conf_key_words.some((key_word) =>
      cal_event_summary.toLowerCase().includes(key_word),
    );
    if (is_soft_conflict) return 'soft';
    const is_ooo_conflict = out_of_office_key_words.some((key_word) =>
      cal_event_summary.toLowerCase().includes(key_word),
    );
    if (is_ooo_conflict) return 'ooo';

    return 'cal_event';
  };
  const promisedInts = ints_meta.map(async (int) => {
    let newInt: InterDetailsType = {
      ...int,
      cal_date_events: {},
      freeTimes: {},
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
      const fetched_events = await google_cal.getAllCalenderEvents(
        start_date,
        end_date,
      );
      newInt.all_events = fetched_events;
      newInt.isCalenderConnected = true;
    } catch (error) {
      newInt.isCalenderConnected = false;
    }
    return newInt;
  });

  const ints_events = await Promise.all(promisedInts);

  const ints_cal_details: InterDetailsType[] = ints_events.map((i) => {
    const cal_event_map: InterDetailsType['cal_date_events'] = {};
    i.all_events.forEach((cal_event) => {
      const cal_event_date = userTzDayjs(cal_event.start.dateTime)
        .tz(cand_tz)
        .startOf('day')
        .format();
      if (!cal_event_map[cal_event_date]) {
        cal_event_map[cal_event_date] = [];
      }
      cal_event_map[cal_event_date].push({
        id: cal_event.id,
        summary: cal_event.summary,
        attendees: cal_event.attendees ?? [],
        organizer: cal_event.organizer,
        end: {
          ...cal_event.end,
        },
        start: {
          ...cal_event.start,
        },
        cal_type: getCalEventType(cal_event.summary),
      });
    });
    return {
      all_events: i.all_events,
      cal_date_events: cal_event_map,
      email: i.email,
      freeTimes: i.freeTimes,
      int_schedule_setting: i.int_schedule_setting,
      interviewer_id: i.interviewer_id,
      isCalenderConnected: i.isCalenderConnected,
      tokens: i.tokens,
      work_hours: i.work_hours,
      day_off: {},
      holiday: {},
    };
  });

  return ints_cal_details;
};
