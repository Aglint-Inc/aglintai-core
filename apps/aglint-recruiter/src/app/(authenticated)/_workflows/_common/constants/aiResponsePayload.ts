import { CustomAgentInstructionPayload } from '@aglint/shared-types';

export const AI_RESPONSE_PLACEHOLDER: CustomAgentInstructionPayload['agent']['ai_response'] =
  {
    scheduleWithinNumDays: 3,
    schedulewithMaxNumDays: 5,
    prefferredInterviewTimes: [{ startTime: '10:00', endTime: '18:00' }],
    excludeInterviewTimes: [],
    maxOptionsToCandidates: 10,
    balanceWorkloadAmongInterviewers: true,
    scheduleOutsideOfficeHoursForTimezoneDifferences: true,
    preferredInterviewer: [],
  } as const;
