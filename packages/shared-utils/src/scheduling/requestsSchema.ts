import * as v from "valibot";

export const createRequestSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  type: v.picklist(["reschedule", "declined", "schedule"]),
  dates: v.nullish(
    v.object({
      start: v.nullish(v.string()),
      end: v.nullish(v.string()),
    })
  ),
  priority: v.nullish(v.picklist(["urgent", "standard"])),
  assignee_id: v.nullish(v.string()),
  assigner_id: v.nullish(v.string()),
  session_names: v.nullish(v.array(v.string())),
});
