import { type DatabaseTable } from '@aglint/shared-types';

type WorkflowCopyType = {
  // eslint-disable-next-line no-unused-vars
  [_key in DatabaseTable['request_progress']['event_type']]: {
    past: string;
    present: string;
    future: string;
    error: string;
  };
};
export const workflowCopy: WorkflowCopyType = {
  CANCEL_AVAIL_REQ: {
    past: 'Availability request canceled.',
    present: 'Canceling availability request.',
    future: 'Awaiting to cancel availability request.',
    error: 'Error occurred while canceling availability request.',
  },

  REQ_CAND_AVAIL_EMAIL_LINK: {
    past: 'Candidate availability link requested.',
    present: 'Requesting candidate availability link.',
    future: 'Awaiting candidate availability link request.',
    error: 'Error occurred while requesting candidate availability link.',
  },

  CAND_AVAIL_REC: {
    past: 'Candidate availability received.',
    present: 'Receiving candidate availability.',
    future: 'Awaiting candidate availability receipt.',
    error: 'Error occurred while receiving candidate availability.',
  },

  SELF_SCHEDULE_LINK: {
    past: 'Self-scheduling link sent.',
    present: 'Sending self-scheduling link.',
    future: 'Awaiting to send self-scheduling link.',
    error: 'Error occurred while sending self-scheduling link.',
  },

  CAND_CONFIRM_SLOT: {
    past: 'Candidate confirmed the slot.',
    present: 'Candidate confirming slot.',
    future: 'Awaiting candidate to confirm slot.',
    error: 'Error occurred while confirming slot with candidate.',
  },

  SELF_SCHEDULE_CANCEL: {
    past: 'Self-scheduling canceled.',
    present: 'Canceling self-scheduling.',
    future: 'Awaiting self-scheduling cancellation.',
    error: 'Error occurred while canceling self-scheduling.',
  },

  RESEND_CAND_AVAIL_EMAIL_LINK: {
    past: 'Candidate availability link resent.',
    present: 'Resending candidate availability link.',
    future: 'Awaiting to resend candidate availability link.',
    error: 'Error occurred while resending candidate availability link.',
  },

  CANCEL_INTERVIEW_MEETINGS: {
    past: 'Interview meetings canceled.',
    present: 'Canceling interview meetings.',
    future: 'Awaiting interview meetings cancellation.',
    error: 'Error occurred while canceling interview meetings.',
  },

  MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER: {
    past: 'Informed interviewer and organizer about cancellation.',
    present: 'Informing interviewer and organizer about cancellation.',
    future: 'Awaiting to inform interviewer and organizer about cancellation.',
    error: 'Error occurred while informing interviewer and organizer about cancellation.',
  },

  REPLACE_ALTERNATIVE_INTERVIEWER: {
    past: 'Alternative interviewer replaced.',
    present: 'Replacing alternative interviewer.',
    future: 'Awaiting replacement of alternative interviewer.',
    error: 'Error occurred while replacing alternative interviewer.',
  },

  SEND_INTERVIEWER_ATTENDANCE_RSVP: {
    past: "RSVP for interviewer's attendance sent on Slack.",
    present: "Sending RSVP for interviewer's attendance on Slack.",
    future: "Awaiting to send RSVP for interviewer's attendance on Slack.",
    error: "Error occurred while sending RSVP for interviewer's attendance on Slack.",
  },

  SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK: {
    past: 'First follow-up availability link scheduled.',
    present: 'Scheduling first follow-up availability link.',
    future: 'Awaiting to schedule first follow-up availability link.',
    error: 'Error occurred while scheduling first follow-up availability link.',
  },

  SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE: {
    past: 'Follow-up email for self-scheduling scheduled.',
    present: 'Scheduling follow-up email for self-scheduling.',
    future: 'Awaiting to schedule follow-up email for self-scheduling.',
    error: 'Error occurred while scheduling follow-up email for self-scheduling.',
  },

  CANDIDATE_AVAILABILITY_RE_REQUESTED: {
    past: "Candidate's availability re-requested.",
    present: "Re-requesting candidate's availability.",
    future: "Awaiting re-request for candidate's availability.",
    error: "Error occurred while re-requesting candidate's availability.",
  },

  SCHEDULE_INTERVIEW_SLOT: {
    past: 'Interview slot scheduled.',
    present: 'Scheduling interview slot.',
    future: 'Awaiting interview slot scheduling.',
    error: 'Error occurred while scheduling interview slot.',
  },

  SCHEDULE_INTERVIEW_SLOT_FROM_CANDIDATE_AVAILABILITY: {
    past: 'Interview slot scheduled from candidate availability.',
    present: 'Scheduling interview slot from candidate availability.',
    future: 'Awaiting interview slot scheduling from candidate availability.',
    error: 'Error occurred while scheduling interview slot from candidate availability.',
  },

  SLOT_SUGGESTION: {
    past: 'Slot suggestion sent on Slack.',
    present: 'Sending slot suggestion on Slack.',
    future: 'Awaiting to send slot suggestion on Slack.',
    error: 'Error occurred while sending slot suggestion on Slack.',
  },
};

