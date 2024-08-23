import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

type EventTriggerMapType = {
  // eslint-disable-next-line no-unused-vars
  [key in DatabaseEnums['workflow_trigger']]: DatabaseEnums['workflow_trigger'][];
};

export const nextPossibleTrigger: EventTriggerMapType = {
  onRequestSchedule: [
    'selfScheduleReminder',
    'candidateBook',
    'sendAvailReqReminder',
    'onReceivingAvailReq',
  ],
  onReceivingAvailReq: ['candidateBook', 'selfScheduleReminder'],
  onRequestReschedule: [],
  onRequestInterviewerDecline: [],
  onRequestCancel: [],
  interviewStart: [],
  sendAvailReqReminder: ['onReceivingAvailReq'],
  interviewerConfirmation: [],
  interviewEnd: [],
  meetingDeclined: [],
  meetingAccepted: [],
  onQualified: [],
  onTrainingComplete: [],
  selfScheduleReminder: ['candidateBook'],
  onSelfScheduleReqAgent: [],
  candidateBook: [],
};

export const apiTargetToEvents: Partial<
  Record<
    DatabaseEnums['email_slack_types'],
    DatabaseTable['request_progress']['event_type'][]
  >
> = {
  onRequestSchedule_emailLink_getCandidateAvailability: [
    'FIND_CURR_AVAIL_SLOTS',
    'REQ_CAND_AVAIL_EMAIL_LINK',
  ],
  onReceivingAvailReq_agent_sendSelfScheduleRequest: [
    'FIND_SUITABLE_SLOTS',
    'SELF_SCHEDULE_LINK',
  ],
  onRequestInterviewerDecline_agent_changeInterviewer: [
    'REPLACE_ALTERNATIVE_INTERVIEWER',
  ],
  candidateBook_slack_interviewerForConfirmation: [
    'SEND_INTERVIEWER_ATTENDANCE_RSVP',
  ],
};
export const eventToTrigger: Partial<
  Record<
    DatabaseTable['request_progress']['event_type'],
    DatabaseEnums['workflow_trigger']
  >
> = {
  CAND_AVAIL_REC: 'onReceivingAvailReq',
  CAND_CONFIRM_SLOT: 'candidateBook',
};
