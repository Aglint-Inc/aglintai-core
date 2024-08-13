import * as v from 'valibot';

export const createRequestSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  type: v.picklist(['reschedule', 'declined']),
  dates: v.optional(
    v.object({
      start: v.string(),
      end: v.string(),
    })
  ),
});
