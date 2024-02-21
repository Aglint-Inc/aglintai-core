import dayjs from 'dayjs';
import { has } from 'lodash';

import { supabase } from '@/src/utils/supabase/client';

import {
  AvalabilitySlotType,
  InterviewData,
  InterviewerAvailabliity,
  InterviewerType,
  MergedEvents,
  StateAvailibility,
} from './availability.types';
import { countSlotStatus, getAvailability } from './utils';
import { supabaseWrap } from '../../JobsDashboard/JobPostCreateUpdate/utils';

export function convertToJSON(data: InterviewerType[]): InterviewData {
  const jsonObject: InterviewData = {};

  data.forEach((interviewer) => {
    const interviewerId = interviewer.interviewerId;
    interviewer.slots.forEach((slot) => {
      const availability = slot.availability;
      const timeDuration = slot.timeDuration;
      Object.keys(availability).forEach((dateKey) => {
        availability[String(dateKey)].forEach((timeSlot) => {
          const { status, endTime, startTime } = timeSlot;
          if (!jsonObject[String(interviewerId)]) {
            jsonObject[String(interviewerId)] = {
              email: interviewer.email,
              interviewerId: interviewer.interviewerId,
              interviewerName: interviewer.interviewerName,
              isMailConnected: interviewer.isMailConnected,
              profileImg: interviewer.profileImg,
            };
          }
          if (!jsonObject[String(interviewerId)][Number(timeDuration)]) {
            jsonObject[String(interviewerId)][Number(timeDuration)] = {};
          }
          if (
            !jsonObject[String(interviewerId)][Number(timeDuration)][
              String(dateKey)
            ]
          ) {
            jsonObject[String(interviewerId)][Number(timeDuration)][
              String(dateKey)
            ] = [];
          }
          jsonObject[String(interviewerId)][Number(timeDuration)][
            String(dateKey)
          ].push({
            status,
            endTime: dayjs(endTime).toISOString(),
            startTime: dayjs(startTime).toISOString(),
          });
        });
      });
    });
  });

  return jsonObject;
}
export function convertFromJSON(data: InterviewData): InterviewerType[] {
  const interviewers: InterviewerType[] = [];

  for (const interviewerId in data) {
    if (Object.prototype.hasOwnProperty.call(data, interviewerId)) {
      const slots = data[String(interviewerId)];
      const interviewerSlots: InterviewerAvailabliity[] = [];

      for (const timeDuration in slots) {
        if (Object.prototype.hasOwnProperty.call(slots, timeDuration)) {
          const availability: Record<string, AvalabilitySlotType[]> = {};
          const dateKeys = slots[Number(timeDuration)];
          for (const dateKey in dateKeys) {
            if (Object.prototype.hasOwnProperty.call(dateKeys, dateKey)) {
              availability[String(dateKey)] = dateKeys[String(dateKey)].map(
                (slot) => ({
                  startTime: new Date(slot.startTime),
                  endTime: new Date(slot.endTime),
                  status: slot.status as
                    | 'available'
                    | 'declined'
                    | 'confirmed'
                    | 'requested',
                }),
              );
            }
          }

          interviewerSlots.push({
            timeDuration: Number(timeDuration),
            availability: availability,
            cntConfirmed: 0, // Assuming these are not provided in the input data
            cntRequested: 0, // Assuming these are not provided in the input data
          });
        }
      }

      interviewers.push({
        interviewerId: interviewerId,
        slots: interviewerSlots,
        email: data[String(interviewerId)].email,
        interviewerName: data[String(interviewerId)].interviewerName,
        isMailConnected: data[String(interviewerId)].isMailConnected,
        profileImg: data[String(interviewerId)].profileImg,
      });
    }
  }

  return interviewers;
}

export const createSingleInterviewPromise = async (
  interviewer: InterviewerType,
  timeSlot: number,
  dateRange: StateAvailibility['dateRangeView'],
  workingHours: StateAvailibility['timeRange'],
) => {
  let startDateStr = dayjs(dateRange.startDate).format('YYYY-MM-DD');
  let endDateStr = dayjs(dateRange.endDate).format('YYYY-MM-DD');
  let intAval: InterviewerAvailabliity = {
    timeDuration: timeSlot,
    availability: await getAvailability(
      interviewer.interviewerId,
      timeSlot,
      dayjs(startDateStr).toISOString(),
      dayjs(endDateStr).toISOString(),
      {
        startTime: workingHours.start.toISOString(),
        endTime: workingHours.end.toISOString(),
      },
    ),
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

export const fetchAvailSlots = async (
  inters: InterviewerType[],
  reqTimeSlot: number,
  dateRange: StateAvailibility['dateRangeView'],
  timeRange: StateAvailibility['timeRange'],
) => {
  let interviewersPromises = inters.map(async (interW) => {
    let interviewer: InterviewerType = interW;

    try {
      interviewer = await createSingleInterviewPromise(
        interviewer,
        reqTimeSlot,
        dateRange,
        timeRange,
      );
      interviewer.isMailConnected = true;
    } catch (error) {
      interviewer.isMailConnected = false;
      interviewer.slots = [];
    }
    return interviewer;
  });
  return await Promise.all(interviewersPromises);
};

export function mergeInterviewerStatus(
  interviewers: StateAvailibility['interviewers'],
  statusReq: AvalabilitySlotType['status'],
) {
  const mergedEvents: MergedEvents = {};

  interviewers.forEach((interviewer) => {
    interviewer.slots.forEach((slot) => {
      for (const date in slot.availability) {
        if (!mergedEvents[String(date)]) {
          mergedEvents[String(date)] = {};
        }
        slot.availability[String(date)].forEach((timeSlot) => {
          if (timeSlot.status !== statusReq) return;
          const timeRange = `${timeSlot.startTime}_${timeSlot.endTime}`;
          if (!mergedEvents[String(date)][String(timeRange)]) {
            mergedEvents[String(date)][String(timeRange)] = [];
          }
          mergedEvents[String(date)][String(timeRange)].push({
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
            interviewerId: interviewer.interviewerId,
            interviewerName: interviewer.interviewerName,
            profileImg: interviewer.profileImg,
            email: interviewer.email,
            status: timeSlot.status,
          });
        });
      }
    });
  });

  return mergedEvents;
}
export const fetchSavedInts = async (inters: InterviewerType[]) => {
  const savedIntsPromises = inters.map(async (int) => {
    const [saved] = supabaseWrap(
      await supabase
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

///merge db saved slots and available slots
export function mergeSavedAndAvailableSlots(
  intAvalableSlots: InterviewerType[],
  intSavedSlots: InterviewerType[],
  dateRangeViewLocal: StateAvailibility['dateRangeView'],
) {
  const generateDates = (
    dateRangeView: StateAvailibility['dateRangeView'],
  ): string[] => {
    const dates: string[] = [];
    const startDate = new Date(dateRangeView.startDate);
    const endDate = new Date(dateRangeView.endDate);
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
