import {
  type DatabaseTable,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { type ApiResponseFindAvailability } from '@requests/types';

export function filterSchedulingOptionsArray({
  schedulingOptions,
  filters,
}: {
  schedulingOptions: ApiResponseFindAvailability['slots'];
  filters: DatabaseTable['candidate_request_availability']['availability'];
}) {
  if (schedulingOptions.length === 0) {
    return [];
  }
  const day_filtered_slots: { date: string; count: number }[] = [];
  for (const curr_day_slots of schedulingOptions) {
    const [curr_round_slots] = curr_day_slots.interview_rounds;

    if (curr_round_slots.plans[0].no_slot_reasons.length === 0) {
      const curr_day_str = curr_round_slots.curr_date;
      const filtered_slots = curr_round_slots.plans.filter((option) => {
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
