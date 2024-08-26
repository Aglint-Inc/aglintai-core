import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

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
  onReceivingAvailReq_agent_sendSelfScheduleRequest: ['SELF_SCHEDULE_LINK'],
  onRequestInterviewerDecline_agent_changeInterviewer: [
    'REPLACE_ALTERNATIVE_INTERVIEWER',
  ],
  candidateBook_slack_interviewerForConfirmation: [
    'SEND_INTERVIEWER_ATTENDANCE_RSVP',
  ],
  sendAvailReqReminder_email_applicant: ['REQ_AVAIL_FIRST_FOLLOWUP'],
};
