import { type PlanCombinationRespType } from '@aglint/shared-types';
import dayjs, { type Dayjs } from 'dayjs';

export const assignCandidateSlot = (
  curr_day_slots: PlanCombinationRespType[],
  selected_start_time: Dayjs,
) => {
  // filter slots based on candidate preference
  const filtered_slots = curr_day_slots.filter((slot) => {
    return dayjs(slot.sessions[0].start_time).isSame(
      selected_start_time,
      'minutes',
    );
  });

  if (filtered_slots.length === 0) {
    throw new Error('Candidate selected slot not available');
  }

  // more filters to go

  return filtered_slots[0];
};
