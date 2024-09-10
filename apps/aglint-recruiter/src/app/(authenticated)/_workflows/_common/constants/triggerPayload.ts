import { DatabaseView } from '@aglint/shared-types';

export const TRIGGER_PAYLOAD: readonly {
  trigger: DatabaseView['workflow_view']['trigger'];
  phase: DatabaseView['workflow_view']['phase'][];
}[] = [
  {
    trigger: 'sendAvailReqReminder',
    phase: ['after'],
  },
  {
    trigger: 'selfScheduleReminder',
    phase: ['after'],
  },
  {
    trigger: 'interviewStart',
    phase: ['before'],
  },
  {
    trigger: 'interviewerConfirmation',
    phase: ['after'],
  },
  {
    trigger: 'interviewEnd',
    phase: ['after'],
  },
  {
    trigger: 'meetingDeclined',
    phase: ['after'],
  },
  {
    trigger: 'meetingAccepted',
    phase: ['after'],
  },
  {
    trigger: 'candidateBook',
    phase: ['after'],
  },
  {
    trigger: 'onQualified',
    phase: ['after'],
  },
  {
    trigger: 'onTrainingComplete',
    phase: ['after'],
  },
  {
    trigger: 'onRequestSchedule',
    phase: ['after'],
  },
  {
    trigger: 'onReceivingAvailReq',
    phase: ['after'],
  },
  {
    phase: ['after'],
    trigger: 'onRequestCancel',
  },
  {
    phase: ['after'],
    trigger: 'onRequestReschedule',
  },
  {
    phase: ['after'],
    trigger: 'onRequestInterviewerDecline',
  },
] as const;
