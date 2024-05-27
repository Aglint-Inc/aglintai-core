/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';

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
