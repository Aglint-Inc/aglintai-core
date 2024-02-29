import axios from 'axios';
import countryTimeZone from 'countries-and-timezones';
import dayjs from 'dayjs';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  InterviewerType,
  MergedEvents,
  StateAvailibility,
} from './availability.types';

export const DAYS_LENGTH = 5;

export const getAvailability = async (
  recruiterId: string,
  timeSlot: number,
  startDate: string,
  endDate: string,
  workingHours?: {
    startTime: string;
    endTime: string;
  },
) => {
  const { data } = await axios.post('/api/scheduling/list-availability', {
    recruiterId: recruiterId,
    timeDuration: timeSlot,
    startDate,
    endDate,
    working_hours: workingHours,
  });
  const { groupedSlots, timeZone } = data as {
    timeZone: string;
    groupedSlots: InterviewerAvailabliity['availability'];
  };

  let updatedResp: InterviewerAvailabliity['availability'] = {};
  for (let key of Object.keys(groupedSlots)) {
    updatedResp[String(key)] = groupedSlots[String(key)].map((s) => ({
      ...s,
    }));
  }
  return { timeZone: timeZone, availability: updatedResp };
};

export const initialiseCheckedInts = (
  interviewers: StateAvailibility['interviewers'],
) => {
  const foo = (slots: InterviewerAvailabliity[]): InterviewerAvailabliity[] => {
    return slots.map((slot) => {
      let availClone = {};
      for (let keyDay of Object.keys(slot.availability)) {
        availClone[String(keyDay)] = [];
      }
      return {
        timeDuration: slot.timeDuration,
        cntConfirmed: 0,
        cntRequested: 0,
        availability: availClone,
      };
    });
  };

  return interviewers.map((int) => ({
    countCheckedSlots: 0,
    interviewerId: int.interviewerId,
    interviewerName: int.interviewerName,
    profileImg: int.profileImg,
    slots: foo(int.slots),
  }));
};
export function mergeInterviewerEvents(
  interviewers: StateAvailibility['interviewers'],
  timeDuration: number,
  timeRange: StateAvailibility['timeRange'],
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

//used in confirm available slots page inside use effect

export function mergeInterviewerEventsWithTimeSlot(
  interviewers: InterviewerType[],
  timeDuration: number,
) {
  const mergedEvents: MergedEvents = {};

  for (let inter of interviewers) {
    let slotAvail = inter.slots.find((sl) => sl.timeDuration === timeDuration);
    if (!slotAvail) continue;
    for (let dayKey in slotAvail.availability) {
      if (!mergedEvents[String(dayKey)]) {
        mergedEvents[String(dayKey)] = {};
      }

      for (let timeSlot of slotAvail.availability[String(dayKey)]) {
        if (timeSlot.status !== 'requested') continue;
        const timeRange = `${timeSlot.startTime}_${timeSlot.endTime}`;
        if (!mergedEvents[String(dayKey)][String(timeRange)]) {
          mergedEvents[String(dayKey)][String(timeRange)] = {
            isChecked: false,
            slots: [],
          };
        }
        mergedEvents[String(dayKey)][String(timeRange)].slots.push({
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          interviewerId: inter.interviewerId,
          interviewerName: inter.interviewerName,
          email: inter.email,
          profileImg: inter.profileImg,
          status: timeSlot.status,
        });
      }
    }
  }
  return mergedEvents;
}
//date
//date-time
export const groupSlots = (
  interviewer,
  availabilities: InterviewerAvailabliity['availability'],
  slotStatus: AvalabilitySlotType['status'],
) => {
  const mergedEvents: MergedEvents = {};

  for (const date in availabilities) {
    if (!mergedEvents[String(date)]) {
      mergedEvents[String(date)] = {};
    }
    availabilities[String(date)].forEach((timeSlot) => {
      if (timeSlot.status !== slotStatus) return;
      const timeRange = `${timeSlot.startTime}_${timeSlot.endTime}`;
      if (!mergedEvents[String(date)][String(timeRange)]) {
        mergedEvents[String(date)][String(timeRange)] = {
          isChecked: false,
          slots: [],
        };
      }
      mergedEvents[String(date)][String(timeRange)].slots.push({
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

  return mergedEvents;
};

export const countSlotStatus = (
  interAvail: InterviewerAvailabliity[],
  status: AvalabilitySlotType['status'],
  timeSlot: number,
) => {
  const availability =
    interAvail.find((intA) => intA.timeDuration === timeSlot)?.availability ??
    {};

  let count = 0;
  // Loop through each date
  for (const date in availability) {
    // Loop through each object for that date
    for (const obj of availability[String(date)]) {
      // If the status is "available", increment the count
      if (obj.status === status) {
        count++;
      }
    }
  }
  return count;
};

export const getTimeRangeStatusSlots = (
  interAvail: InterviewerAvailabliity[],
  status: AvalabilitySlotType['status'],
  timeSlot: number,
) => {
  let slots: AvalabilitySlotType[] = [];
  const availability = interAvail.find(
    (intA) => intA.timeDuration === timeSlot,
  ).availability;

  // Loop through each date
  for (const date in availability) {
    // Loop through each object for that date
    for (const obj of availability[String(date)]) {
      // If the status is "available", increment the count
      if (obj.status === status) {
        slots.push({ ...obj });
      }
    }
  }
  return slots;
};

export const handleDelete = async (panel_id: string | string[]) => {
  try {
    const { data, error } = await supabase
      .from('interview_schedule')
      .select('id')
      .eq('panel_id', panel_id)
      .neq('status', 'completed');

    if (error) {
      throw new Error(error.message);
    }
    if (data.length > 0) {
      toast.error(
        'This panel has interviews scheduled. Please cancel the interviews before deleting the panel.',
      );
      return false;
    } else {
      const { error } = await supabase
        .from('interview_panel')
        .delete()
        .eq('id', panel_id);

      if (error) {
        throw new Error(error.message);
      }
      return true;
    }
  } catch (error) {
    toast.error("Couldn't delete panel. Please try again later.");
  }
};

export const getCurrentTimeZone = () => {
  // Get the current time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tz = countryTimeZone.getTimezone(timeZone);

  return {
    label: `(UTC ${tz.utcOffsetStr} ) ` + tz.name,
    value: tz.name,
  };
};
