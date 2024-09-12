import { z } from 'zod';

export const schemaFindAlternativeSlots = z.object({
  session_id: z.string(),
  declined_int_sesn_reln_id: z.string(),
});
