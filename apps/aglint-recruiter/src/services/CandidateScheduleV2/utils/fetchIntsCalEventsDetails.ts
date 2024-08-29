/* eslint-disable security/detect-object-injection */
import {
  CalConflictType,
  InterDetailsType,
  schedulingSettingType,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';

import { GoogleCalender } from '../../GoogleCalender/google-calender';
import { ScheduleApiDetails } from '../types';
import { userTzDayjs } from './userTzDayjs';

export const fetchIntsCalEventsDetails = async (
  db_details: ScheduleApiDetails,
) => {
  const ints_events_map = await fetchIntsCalEvents({
    inter_details: db_details.all_inters.map((i) => ({
      all_events: [],
      email: i.email,
      interviewer_id: i.user_id,
      isCalenderConnected: false,
      tokens: i.schedule_auth,
      name: getFullName(i.first_name, i.last_name),
      profile_image: i.profile_image,
      position: i.position,
    })),
    company_cred_hash_str: db_details.company_cred_hash_str,
    start_time: db_details.schedule_dates.user_start_date_js.format(),
    end_time: db_details.schedule_dates.user_end_date_js.format(),
  });

  const ints_cal_details: InterDetailsType[] = db_details.all_inters.map(
    (i) => {
      let inter_details: InterDetailsType = {
        all_events: [...ints_events_map[i.user_id].all_events],
        email: i.email,
        full_name: getFullName(i.first_name, i.last_name),
        int_schedule_setting: i.scheduling_settings,
        interviewer_id: i.user_id,
        isCalenderConnected: ints_events_map[i.user_id].isCalenderConnected,
        tokens: i.schedule_auth,
        work_hours: {},
        cal_date_events: {},
        freeTimes: {},
        day_off: {},
        holiday: {},
      };
      const cal_event_map: InterDetailsType['cal_date_events'] = {};
      ints_events_map[i.user_id].all_events.forEach((cal_event) => {
        const cal_event_date = userTzDayjs(cal_event.start.dateTime)
          .tz(db_details.req_user_tz)
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
          cal_type: getCalEventType(
            cal_event.summary,
            db_details.comp_schedule_setting,
          ),
        });
      });
      inter_details.cal_date_events = { ...cal_event_map };
      return inter_details;
    },
  );

  return { ints_cal_details, ints_events_map };
};

type FetchCalEventsParams = {
  inter_details: (Pick<
    InterDetailsType,
    'email' | 'tokens' | 'interviewer_id' | 'isCalenderConnected' | 'all_events'
  > & {
    name: string;
    profile_image: string;
    position: string;
  })[];
  company_cred_hash_str: string | null;
  start_time: string;
  end_time: string;
};

const fetchIntsCalEvents = async (params: FetchCalEventsParams) => {
  const promisedInts = params.inter_details.map(async (int) => {
    const updated_int_details = { ...int };
    try {
      const google_cal = new GoogleCalender(params.company_cred_hash_str, {
        email: int.email,
        schedule_auth: int.tokens,
        user_id: int.interviewer_id,
      });
      await google_cal.authorizeUser();
      const fetched_events = await google_cal.getAllCalenderEvents(
        params.start_time,
        params.end_time,
      );
      updated_int_details.all_events = fetched_events;
      updated_int_details.isCalenderConnected = true;
    } catch (error) {
      updated_int_details.isCalenderConnected = false;
    }

    return updated_int_details;
  });

  const ints_events: FetchCalEventsParams['inter_details'] =
    await Promise.all(promisedInts);
  const ints_events_map: Record<
    string,
    Pick<
      InterDetailsType,
      | 'email'
      | 'tokens'
      | 'interviewer_id'
      | 'isCalenderConnected'
      | 'all_events'
    > & { name: string; profile_image: string; position: string }
  > = {};
  ints_events.forEach((i) => {
    ints_events_map[i.interviewer_id] = {
      ...i,
    };
  });
  return ints_events_map;
};

export const getCalEventType = (
  cal_event_summary: string,
  comp_schedule_setting: schedulingSettingType,
): CalConflictType => {
  const scheduling_keywords = comp_schedule_setting.schedulingKeyWords;
  const is_soft_conflict = scheduling_keywords.SoftConflicts.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLowerCase()),
  );
  if (is_soft_conflict) return 'soft';
  const is_ooo_conflict = scheduling_keywords.outOfOffice.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_ooo_conflict) return 'ooo';

  const is_recruiting_block = scheduling_keywords.recruitingBlocks.some(
    (key_word) =>
      cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_recruiting_block) return 'recruiting_blocks';
  const is_free_block = scheduling_keywords.free.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_free_block) return 'free_time';

  return 'cal_event';
};
