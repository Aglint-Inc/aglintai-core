import {
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
  SessionCombinationRespType,
} from '@aglint/shared-types';

import { ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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
  let day_filtered_slots: { date: string; count: number }[] = [];
  for (let curr_day_slots of schedulingOptions) {
    const [curr_round_slots] = curr_day_slots.interview_rounds;

    if (curr_round_slots.plans[0].no_slot_reasons.length === 0) {
      const curr_day_str = curr_round_slots.curr_date;
      let filtered_slots = curr_round_slots.plans.filter((option) => {
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

export async function insertCandidateRequestAvailability(
  data: DatabaseTableInsert['candidate_request_availability'],
) {
  try {
    const { error, data: result } = await supabase
      .from('candidate_request_availability')
      .insert({ ...data })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  } catch (error) {
    toast.error(error.message);
  }
}

export async function updateCandidateRequestAvailability({
  data,
  id,
}: {
  data: DatabaseTableUpdate['candidate_request_availability'];
  id: string;
}) {
  try {
    const { error, data: result } = await supabase
      .from('candidate_request_availability')
      .update({ ...data })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  } catch (error) {
    toast.error(error.message);
  }
}
