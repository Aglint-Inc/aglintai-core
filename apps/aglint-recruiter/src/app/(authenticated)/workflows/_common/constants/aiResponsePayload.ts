import type { CustomAgentInstructionPayload } from '@aglint/shared-types';

export const AI_RESPONSE_PLACEHOLDER: CustomAgentInstructionPayload['agent']['ai_response'] =
  {
    candidateAvailability: null,
    prefferredInterviewers: [],
    maxTotalSlots: 10,
    includeAllSoftConflictSlots: true,
    overrideSoftConflicts: [],
  } as const;
