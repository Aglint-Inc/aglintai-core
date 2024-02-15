import axios from 'axios';
import { cloneDeep, get, set } from 'lodash';

import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  InterviewerType,
  StateAvailibility,
} from './availability.types';

export const DAYS_LENGTH = 5;

export const getAvailability = async (
  currentMonth: string,
  recruiterId: string,
  timeSlot: number,
) => {
  const { data } = (await axios.post('/api/scheduling/list-availability', {
    recruiterId: recruiterId,
    currentMonth,
    timeDuration: timeSlot,
  })) as { data: InterviewerAvailabliity['availability'] };

  let updatedResp: InterviewerAvailabliity['availability'] = {};

  for (let key of Object.keys(data)) {
    updatedResp[String(key)] = data[String(key)].map((s) => ({
      ...s,
    }));
  }
  return updatedResp;
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
  interviewers:
    | StateAvailibility['interviewers']
    | StateAvailibility['checkedInterSlots'],
) {
  const mergedEvents: MergedEvents = {};

  interviewers.forEach((interviewer) => {
    interviewer.slots.forEach((slot) => {
      for (const date in slot.availability) {
        if (!mergedEvents[String(date)]) {
          mergedEvents[String(date)] = {};
        }
        slot.availability[String(date)].forEach((timeSlot) => {
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
          });
        });
      }
    });
  });

  return mergedEvents;
}

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
          mergedEvents[String(dayKey)][String(timeRange)] = [];
        }
        mergedEvents[String(dayKey)][String(timeRange)].push({
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          interviewerId: inter.interviewerId,
          interviewerName: inter.interviewerName,
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
        mergedEvents[String(date)][String(timeRange)] = [];
      }
      mergedEvents[String(date)][String(timeRange)].push({
        startTime: timeSlot.startTime,
        endTime: timeSlot.endTime,
        interviewerId: interviewer.interviewerId,
        interviewerName: interviewer.interviewerName,
        profileImg: interviewer.profileImg,
      });
    });
  }

  return mergedEvents;
};
export interface MergedEvents {
  [date: string]: {
    [timeRange: string]: {
      startTime: Date;
      endTime: Date;
      interviewerId: string;
      interviewerName: string;
      profileImg: string;
      status?: AvalabilitySlotType['status'];
    }[];
  };
}
export const updateTimeSlotStatusUtil = (
  interviewers: StateAvailibility['interviewers'],
  checkedInterSlots: StateAvailibility['checkedInterSlots'],
  newStatus: AvalabilitySlotType['status'],
  timeSlot: number,
) => {
  let updInterviewers = cloneDeep(interviewers);
  let updCheckedInterSlots = cloneDeep(checkedInterSlots);
  updCheckedInterSlots = updCheckedInterSlots.map((u) => ({
    ...u,
    countCheckedSlots: 0,
  }));
  for (let idx = 0; idx < updCheckedInterSlots.length; ++idx) {
    for (
      let idx2 = 0;
      idx2 < updCheckedInterSlots[Number(idx)].slots.length;
      ++idx2
    ) {
      const daySlots = updCheckedInterSlots[Number(idx)].slots[Number(idx2)];
      if (daySlots.timeDuration !== timeSlot) continue;
      const checkedDaysKeys = Object.keys(daySlots.availability).filter(
        (str) => daySlots.availability[String(str)].length > 0,
      );
      for (let checkedDaysKey of checkedDaysKeys) {
        let dayPath = `[${idx}].slots[${idx2}].availability[${String(
          String(checkedDaysKey),
        )}]`;

        for (let checkedSlot of get(
          updCheckedInterSlots,
          dayPath,
        ) as AvalabilitySlotType[]) {
          let updatedIntSlots = get(updInterviewers, dayPath).map(
            (intSlot: AvalabilitySlotType) => {
              if (intSlot.startTime === checkedSlot.startTime) {
                intSlot.status = newStatus;
              }
              return intSlot;
            },
          );

          updInterviewers[Number(idx)].slots[Number(idx2)].cntRequested += (
            get(updCheckedInterSlots, dayPath) as AvalabilitySlotType[]
          ).length;
          set(updInterviewers, dayPath, updatedIntSlots);
        }
        set(updCheckedInterSlots, dayPath, []);
        // console.log(get(updInterviewers, dayPath));
        // console.log(get(updCheckedInterSlots, dayPath));
      }
    }
  }

  return { updInterviewers, updCheckedInterSlots };
};

export const countSlotStatus = (
  interAvail: InterviewerAvailabliity[],
  status: AvalabilitySlotType['status'],
  timeSlot: number,
) => {
  const availability = interAvail.find(
    (intA) => intA.timeDuration === timeSlot,
  ).availability;

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
