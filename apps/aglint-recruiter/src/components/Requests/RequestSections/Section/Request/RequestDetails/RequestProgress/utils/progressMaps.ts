import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';

export type ApiTargetToEvents = Partial<
  Record<
    DatabaseEnums['email_slack_types'],
    DatabaseTable['request_progress']['event_type']
  >
>;
export const apiTargetToEvents: ApiTargetToEvents = {
  onRequestSchedule_emailLink_getCandidateAvailability:
    'REQ_CAND_AVAIL_EMAIL_LINK',
  onReceivingAvailReq_agent_sendSelfScheduleRequest: 'SELF_SCHEDULE_LINK',
  onRequestInterviewerDecline_agent_changeInterviewer:
    'REPLACE_ALTERNATIVE_INTERVIEWER',
  candidateBook_slack_interviewerForConfirmation:
    'SEND_INTERVIEWER_ATTENDANCE_RSVP',
  sendAvailReqReminder_email_applicant: 'REQ_AVAIL_FIRST_FOLLOWUP',
  onRequestSchedule_emailLink_sendSelfSchedulingLink: 'SELF_SCHEDULE_LINK',
  selfScheduleReminder_email_applicant: 'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
  onRequestCancel_agent_cancelEvents: 'CANCEL_INTERVIEW_MEETINGS',
  onRequestCancel_slack_interviewersOrganizer:
    'MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER',
  onReceivingAvailReq_agent_confirmSlot: 'SCHEDULE_INTERVIEW_SLOT',
};

type GroupeTriggerEvent =
  | 'beforeAvailabilityReceive'
  | 'availReceived'
  | 'onInterviewSchedules';

export const groupedTriggerEventMap: Partial<
  Record<GroupeTriggerEvent, DatabaseTable['request_progress']['event_type'][]>
> = {
  availReceived: [
    'CANDIDATE_AVAILABILITY_RE_REQUESTED',
    'CAND_AVAIL_REC',
    'SELF_SCHEDULE_LINK',
    'SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE',
    'SELF_SCHEDULE_LINK',
  ],
};
