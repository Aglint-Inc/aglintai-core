import * as v from 'valibot';

export const createCandidateRequestSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  type: v.picklist(['reschedule', 'declined']),
  dates: v.nullish(
    v.object({
      start: v.nullish(v.string()),
      end: v.nullish(v.string()),
    })
  ),
});

export const createInterviewerRequestSchema = v.object({
  session_id: v.string(),
  interview_cancel_id: v.string(),
});
