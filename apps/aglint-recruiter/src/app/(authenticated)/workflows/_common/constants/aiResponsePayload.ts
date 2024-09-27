import { type z } from 'zod';

import { type agentSelfScheduleInstruction } from '@/services/api-schedulings/textTransforms/selfScheduleLinkInstruction';

export const AI_RESPONSE_PLACEHOLDER: z.infer<
  typeof agentSelfScheduleInstruction
> = {
  candidateAvailability: null,
  include_outside_working_hours: false,
  maxTotalSlots: 10,
  includeAllSoftConflictSlots: true,
  overrideSoftConflicts: [],
} as const;
