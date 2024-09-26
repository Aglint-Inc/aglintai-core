import { z } from 'zod';

const slotTimeSchema = z.object({
  start_time: z.string(),
  end_time: z.string(),
});

export const SchemaCandidateDirectBooking = z.object({
  filter_id: z.string().min(1, 'required filter_id'),
  cand_tz: z.string().min(1, 'required cand_tz'),
  selected_plan: z.array(slotTimeSchema),
});

export const SchemaConfirmSlotNoConflict = z.object({
  filter_id: z.string().min(1, 'required filter_id'),
  cand_tz: z.string().min(1, 'required cand_tz'),
  agent_type: z
    .enum(['phone_agent', 'email_agent', 'candidate'])
    .optional()
    .default('email_agent'),
  selected_slot: z.object({
    slot_start_time: z.string(),
  }),
});
