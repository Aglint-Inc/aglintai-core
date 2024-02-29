import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, has } from 'lodash';

import { findAvailableTimeSlotsFromCalEvents } from './schedule-utils/findAvailableSlots';
import {
  getBlockedSlots,
  getGroupTimeSlots,
  getRecruiterAuthTokens,
  getUserTimeZone,
} from './schedule-utils/utils';
import { supabaseAdmin } from './supabase/supabaseAdmin';
import { supabaseWrap } from '../components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  InterviewerAvailabliity,
  InterviewerType,
  MergedEvents,
  StateAvailibility,
} from '../components/Scheduling/Availability/availability.types';
import { countSlotStatus } from '../components/Scheduling/Availability/utils';
import {
  convertFromJSON,
  convertToJSON,
} from '../components/Scheduling/Availability/utils2';
import { RecruiterUserType } from '../types/data.types';

export type get_available_events_params = {
  interv_ids: string[];
  time_slot;
  date_range: {
    start: string;
    end: string;
  };
  time_range: {
    start: string;
    end: string;
  };
};

const fetch_saved_ints = async (inters: InterviewerType[]) => {
  const savedIntsPromises = inters.map(async (int) => {
    const [saved] = supabaseWrap(
      await supabaseAdmin
        .from('interview_availabilties')
        .select('slot_availability')
        .eq('user_id', int.interviewerId),
    );
    const intS: InterviewerType = {
      ...int,
      slots: (saved.slot_availability ?? []) as InterviewerAvailabliity[],
    };
    return intS;
  });
  let intSavedSlots = await Promise.all(savedIntsPromises);
  return intSavedSlots;
};

function merge_interviewer_events(
  interviewers: StateAvailibility['interviewers'],
  timeDuration: number,
  timeRange: get_available_events_params['time_range'],
) {
  const mergedEvents: MergedEvents = {};

  interviewers.forEach((interviewer) => {
    interviewer.slots.forEach((slot) => {
      if (slot.timeDuration !== timeDuration) return;
      for (const date in slot.availability) {
        if (!mergedEvents[String(date)]) {
          mergedEvents[String(date)] = {};
        }
        slot.availability[String(date)].forEach((timeSlot) => {
          if (
            dayjs(timeSlot.startTime).hour() < dayjs(timeRange.start).hour() ||
            dayjs(timeSlot.endTime).hour() > dayjs(timeRange.end).hour()
          )
            return;

          if (timeSlot.status !== 'available') return;
          const timePath = `${timeSlot.startTime}_${timeSlot.endTime}`;
          if (!mergedEvents[String(date)][String(timePath)]) {
            mergedEvents[String(date)][String(timePath)] = {
              isChecked: false,
              slots: [],
            };
          }
          mergedEvents[String(date)][String(timePath)].slots.push({
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            interviewerId: interviewer.interviewerId,
            interviewerName: interviewer.interviewerName,
            profileImg: interviewer.profileImg,
            status: timeSlot.status,
            email: interviewer.email,
          });
        });
      }
    });
  });

  return mergedEvents;
}

const fetch_avail_slots = async (
  inters: InterviewerType[],
  reqTimeSlot: number,
  dateRange: get_available_events_params['date_range'],
  timeRange: get_available_events_params['time_range'],
) => {
  let up_inters = cloneDeep(inters);
  const create_single_interview_promise = async (
    interviewer: InterviewerType,
    timeSlot: number,
    dateRange: get_available_events_params['date_range'],
    workingHours: get_available_events_params['time_range'],
  ) => {
    let startDateStr = dayjs(dateRange.start).format('YYYY-MM-DD');
    let endDateStr = dayjs(dateRange.end).format('YYYY-MM-DD');
    const { availability, timeZone } = await handler(
      interviewer.interviewerId,
      timeSlot,
      dayjs(startDateStr).toISOString(),
      dayjs(endDateStr).toISOString(),
      {
        start: workingHours.start,
        end: workingHours.end,
      },
    );

    interviewer.timeZone = timeZone;
    let intAval: InterviewerAvailabliity = {
      timeDuration: timeSlot,
      availability: availability,
      cntConfirmed: 0,
      cntRequested: 0,
    };

    const isTimeSlotExist = interviewer.slots.find(
      (slot) => slot.timeDuration === timeSlot,
    );
    if (!isTimeSlotExist) {
      interviewer.slots = [...interviewer.slots, intAval];
    } else {
      interviewer.slots = interviewer.slots.map((slot) => {
        if (slot.timeDuration === timeSlot) return intAval;
        return slot;
      });
    }

    intAval.cntConfirmed = countSlotStatus(
      interviewer.slots,
      'confirmed',
      timeSlot,
    );

    intAval.cntRequested = countSlotStatus(
      interviewer.slots,
      'requested',
      timeSlot,
    );

    return interviewer;
  };
  let interviewersPromises = up_inters.map(async (interW) => {
    let interviewer: InterviewerType = interW;

    try {
      interviewer = await create_single_interview_promise(
        interviewer,
        reqTimeSlot,
        dateRange,
        timeRange,
      );
      interviewer.isMailConnected = true;
    } catch (error) {
      if (error instanceof AxiosError) {
        // if (error. !== '') console.log(error);
        interviewer.isMailConnected = false;
        interviewer.slots = [];
      }
      throw new Error(error);
    }
    return interviewer;
  });
  return await Promise.all(interviewersPromises);
};

async function handler(
  recruiterId: string,
  timeDuration: get_available_events_params['time_slot'],
  startDate: string,
  endDate: string,
  working_hours: get_available_events_params['time_range'],
) {
  try {
    let tokenInfo = await getRecruiterAuthTokens(recruiterId);

    let userEvents = {
      userId: recruiterId,
      blockedTimings: await getBlockedSlots(
        tokenInfo.access_token,
        tokenInfo.refresh_token,
        startDate,
        endDate,
      ),
    };

    const availableSlots = findAvailableTimeSlotsFromCalEvents(
      userEvents.blockedTimings,
      timeDuration,
      new Date(startDate),
      new Date(endDate),
      working_hours,
    );
    const timeZone = await getUserTimeZone(
      tokenInfo.access_token,
      tokenInfo.refresh_token,
    );
    const groupedSlots = getGroupTimeSlots(availableSlots);
    let updatedResp: InterviewerAvailabliity['availability'] = {};
    for (let key of Object.keys(groupedSlots)) {
      updatedResp[String(key)] = groupedSlots[String(key)].map((s) => ({
        ...s,
      }));
    }
    return { timeZone: timeZone, availability: updatedResp };
    // return { timeZone, groupedSlots };
  } catch (error) {
    throw new Error(error.message);
  }
}

function merge_saved_available_slots(
  intAvalableSlots: InterviewerType[],
  intSavedSlots: InterviewerType[],
  dateRangeViewLocal: get_available_events_params['date_range'],
) {
  const generateDates = (
    dateRangeView: get_available_events_params['date_range'],
  ): string[] => {
    const dates: string[] = [];
    const startDate = new Date(dateRangeView.start);
    const endDate = new Date(dateRangeView.end);
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(dayjs(currentDate).format('YYYY-MM-DD'));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  const availIntsJson = convertToJSON(intAvalableSlots);
  const savedIntJson = convertToJSON(intSavedSlots);
  let dateKeys = generateDates(dateRangeViewLocal);

  for (const intKey in savedIntJson) {
    for (const timeKey in savedIntJson[String(intKey)]) {
      if (!has(availIntsJson[String(intKey)], timeKey)) {
        continue;
      }
      for (const datekey of dateKeys) {
        if (!has(savedIntJson[String(intKey)][Number(timeKey)], datekey))
          continue;
        for (const timeA of savedIntJson[String(intKey)][Number(timeKey)][
          String(datekey)
        ]) {
          if (availIntsJson[String(intKey)][Number(timeKey)][String(datekey)]) {
            availIntsJson[String(intKey)][Number(timeKey)][String(datekey)] =
              availIntsJson[String(intKey)][Number(timeKey)][
                String(datekey)
              ].map((t) => {
                if (t.startTime === timeA.startTime) {
                  t.status = timeA.status;
                }
                return t;
              });
          }
        }
      }
    }
  }

  const finalINts = convertFromJSON(availIntsJson);
  return finalINts;
}

export const get_merged_available_events = async (
  interv_ids: get_available_events_params['interv_ids'],
  time_slot: get_available_events_params['time_slot'],
  date_range: get_available_events_params['date_range'],
  time_range: get_available_events_params['time_range'],
) => {
  const promises = interv_ids.map(async (id) => {
    const [rec] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name,email,schedule_auth,profile_image')
        .eq('user_id', id),
    ) as Pick<
      RecruiterUserType,
      'first_name' | 'last_name' | 'email' | 'schedule_auth' | 'profile_image'
    >[];
    const int: InterviewerType = {
      email: rec.email,
      interviewerId: id,
      interviewerName: [rec.first_name, rec.last_name]
        .filter(Boolean)
        .join(' '),
      isMailConnected: Boolean(rec.schedule_auth),
      profileImg: rec.profile_image,
      slots: [],
      timeZone: '',
    };
    return int;
  });
  let interviewers_info = await Promise.all(promises);
  let saved_int_slots = await fetch_saved_ints(interviewers_info);
  let avail_int_slots = await fetch_avail_slots(
    interviewers_info,
    time_slot,
    date_range,
    time_range,
  );
  const d = merge_saved_available_slots(avail_int_slots, saved_int_slots, {
    end: date_range.end,
    start: date_range.start,
  });
  const res = merge_interviewer_events(d, time_slot, { ...time_range });

  return res;
};
