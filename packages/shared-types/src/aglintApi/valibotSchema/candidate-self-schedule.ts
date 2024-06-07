import * as v from 'valibot';

const slot_time = v.object({
  start_time: v.string(),
  end_time: v.string(),
});

export const schema_candidate_direct_booking = v.object({
  filter_id: v.pipe(v.string(), v.nonEmpty('required filter_id')),
  cand_tz: v.pipe(v.string(), v.nonEmpty('required cand_tz')),
  task_id: v.nullish(v.string()),
  selected_plan: v.array(slot_time),
});
