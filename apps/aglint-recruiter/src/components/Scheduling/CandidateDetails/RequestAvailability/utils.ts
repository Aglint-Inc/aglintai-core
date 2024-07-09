/* eslint-disable security/detect-object-injection */
import {
  APIFindAvailability,
  DatabaseTable,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';

import { ApiResponseFindAvailability } from '../types';

const daysList = Array.from({ length: 10 }, (_, index) => {
  const day = index + 1;
  const label = day === 1 ? `${day} Day` : `${day} Days`;
  return { label: label, value: day };
});
export const requestDaysListOptions = daysList;

const slotsList = Array.from({ length: 10 }, (_, index) => {
  const day = index + 1;
  const label = day === 1 ? `${day} Slot` : `${day} Slots`;
  return { label: label, value: day };
});
export const slotsListOptions = slotsList;

export function getAvailability({
  preValue,
  taskActionType,
}: {
  preValue: DatabaseTable['candidate_request_availability']['availability'];
  taskActionType: keyof DatabaseTable['candidate_request_availability']['availability'];
}) {
  preValue[taskActionType] = !preValue[taskActionType];

  return preValue;
}

export function convertMinutesToHoursAndMinutes(minutes) {
  if (minutes === 0) {
    return '0 hours';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursLabel = hours === 1 ? 'Hour' : 'Hours';
  const minutesLabel = remainingMinutes === 1 ? 'Minute' : 'Minutes';

  if (hours === 0) {
    return `${remainingMinutes} ${minutesLabel}`;
  } else if (remainingMinutes === 0) {
    return `${hours} ${hoursLabel}`;
  } else {
    return `${hours} ${hoursLabel} ${remainingMinutes} ${minutesLabel}`;
  }
}

export const availabilityArrayList = [
  { label: 'Suggest times over free keywords', key: 'free_keywords' },
  {
    label: 'Suggest times over recruiting block keywords',
    key: 'recruiting_block_keywords',
  },
  { label: 'Suggest times over day offs', key: 'day_offs' },
  { label: 'Suggest times over outside work hours', key: 'outside_work_hours' },
] as {
  label: string;
  key: keyof DatabaseTable['candidate_request_availability']['availability'];
}[];

export async function getAvailabilitySlots(bodyParams: APIFindAvailability) {
  try {
    const res = await axios.post(
      '/api/scheduling/v1/find_availability',
      bodyParams,
    );
    return res;
  } catch (error) {
    return error;
  }
}

export function filterSchedulingOptionsArray({
  schedulingOptions,
  filters,
}: {
  schedulingOptions: ApiResponseFindAvailability;
  filters: DatabaseTable['candidate_request_availability']['availability'];
}) {
  if (schedulingOptions.length === 0) {
    return [];
  }
  let day_filtered_slots: { date: string; count: number }[] = [];
  for (let curr_day_slots of schedulingOptions) {
    const [curr_round_slots] = curr_day_slots;
    if (curr_round_slots[0].no_slot_reasons.length === 0) {
      const curr_day_str = dayjsLocal(
        curr_round_slots[0].sessions[0].start_time,
      )
        .startOf('day')
        .format();
      let filtered_slots = curr_round_slots.filter((option) => {
        if (option.sessions.every((s) => !s.is_conflict)) return true;

        const slot_conflicts: SessionCombinationRespType['conflict_types'] =
          option.sessions.reduce((all_conflict_types, curr) => {
            return [...all_conflict_types, ...curr.conflict_types];
          }, []);
        if (slot_conflicts.includes('day_off') && filters.day_offs) {
          return true;
        }
        if (
          slot_conflicts.includes('out_of_working_hours') &&
          filters.outside_work_hours
        ) {
          return true;
        }
        return false;
      });
      day_filtered_slots.push({
        date: curr_day_str,
        count: filtered_slots.length,
      });
    } else {
      //
    }
  }

  return day_filtered_slots;
}
