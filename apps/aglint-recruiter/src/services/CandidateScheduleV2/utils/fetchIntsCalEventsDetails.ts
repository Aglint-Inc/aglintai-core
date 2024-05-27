import {
  CompServiceKeyCred,
  InterDetailsType,
  SessionInterviewerType,
} from '@aglint/shared-types';

import { getFullName } from '@/src/utils/jsonResume';

import { GoogleCalender } from '../../GoogleCalender/google-calender';

export const fetchIntsCalEventsDetails = async (
  session_inters: SessionInterviewerType[],
  company_cred: CompServiceKeyCred,
  start_date: string,
  end_date: string,
) => {
  const ints_meta: InterDetailsType[] = session_inters.map((i) => ({
    email: i.email,
    interviewer_id: i.user_id,
    name: getFullName(i.first_name, i.last_name),
    profile_img: i.profile_image,
    shedule_settings: i.scheduling_settings,
    tokens: i.schedule_auth as any,
    events: [],
    freeTimes: [],
    int_schedule_setting: i.scheduling_settings,
    isCalenderConnected: false,
  }));
  const intervs_details_map: Map<string, InterDetailsType> = new Map();
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
      const fetched_events = await google_cal.getAllCalenderEvents(
        start_date,
        end_date,
      );
      newInt.events = fetched_events.map((e) => ({
        id: e.id,
        attendees: e.attendees,
        organizer: e.organizer,
        end: {
          ...e.end,
        },
        start: {
          ...e.start,
        },
      }));
      newInt.isCalenderConnected = true;
    } catch (error) {
      newInt.isCalenderConnected = false;
    }
    intervs_details_map.set(newInt.interviewer_id, newInt);
  });

  await Promise.all(promiseArr);
  return intervs_details_map;
};
