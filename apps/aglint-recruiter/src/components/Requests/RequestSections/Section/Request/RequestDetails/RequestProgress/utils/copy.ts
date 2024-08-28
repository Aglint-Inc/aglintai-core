import { DatabaseTable } from '@aglint/shared-types';

type WorkflowCopyType = {
  // eslint-disable-next-line no-unused-vars
  [key in DatabaseTable['request_progress']['event_type']]: {
    past: string;
    present: string;
    future: string;
    error: string;
  };
};
export const workflowCopy: WorkflowCopyType = {
  CANCEL_AVAIL_REQ: {
    past: 'The availability request was cancelled.',
    present: 'The availability request is being cancelled.',
    future: 'The availability request will be cancelled.',
    error: 'There was an error cancelling the availability request.',
  },
  FIND_CURR_AVAIL_SLOTS: {
    past: 'Current available slots were found.',
    present: 'Finding current available slots.',
    future: 'Current available slots will be found.',
    error: 'There was an error finding the current available slots.',
  },
  REQ_CAND_AVAIL_EMAIL_LINK: {
    past: 'The candidate availability email link was requested.',
    present: 'Requesting candidate availability email link.',
    future: 'The candidate availability email link will be requested.',
    error:
      'There was an error requesting the candidate availability email link.',
  },
  CAND_AVAIL_REC: {
    past: 'Candidate availability was received.',
    present: 'Receiving candidate availability.',
    future: 'Candidate availability will be received.',
    error: 'There was an error receiving the candidate availability.',
  },
  FIND_SUITABLE_SLOTS: {
    past: 'Suitable slots were found.',
    present: 'Finding suitable slots.',
    future: 'Suitable slots will be found.',
    error: 'There was an error finding suitable slots.',
  },
  SELF_SCHEDULE_LINK: {
    past: 'The self-scheduling link was sent.',
    present: 'Sending the self-scheduling link.',
    future: 'The self-scheduling link will be sent.',
    error: 'There was an error sending the self-scheduling link.',
  },
  CAND_CONFIRM_SLOT: {
    past: 'The candidate confirmed the slot.',
    present: 'The candidate is confirming the slot.',
    future: 'The candidate will confirm the slot.',
    error: 'There was an error with the candidate confirming the slot.',
  },
  REQ_AVAIL_FIRST_FOLLOWUP: {
    past: 'The first follow-up for availability was sent.',
    present: 'Sending the first follow-up for availability.',
    future: 'The first follow-up for availability will be sent.',
    error: 'There was an error sending the first follow-up for availability.',
  },
  REQ_AVAIL_SECOND_FOLLOWUP: {
    past: 'The second follow-up for availability was sent.',
    present: 'Sending the second follow-up for availability.',
    future: 'The second follow-up for availability will be sent.',
    error: 'There was an error sending the second follow-up for availability.',
  },
  SELF_SCHEDULE_FIRST_FOLLOWUP: {
    past: 'The first follow-up for self-scheduling was sent.',
    present: 'Sending the first follow-up for self-scheduling.',
    future: 'The first follow-up for self-scheduling will be sent.',
    error:
      'There was an error sending the first follow-up for self-scheduling.',
  },
  SELF_SCHEDULE_SEC_FOLLOWUP: {
    past: 'The second follow-up for self-scheduling was sent.',
    present: 'Sending the second follow-up for self-scheduling.',
    future: 'The second follow-up for self-scheduling will be sent.',
    error:
      'There was an error sending the second follow-up for self-scheduling.',
  },
  SELF_SCHEDULE_CANCEL: {
    past: 'The self-scheduling was cancelled.',
    present: 'Cancelling the self-scheduling.',
    future: 'The self-scheduling will be cancelled.',
    error: 'There was an error cancelling the self-scheduling.',
  },
  RESEND_CAND_AVAIL_EMAIL_LINK: {
    past: 'The candidate availability email link was resent.',
    present: 'Resending the candidate availability email link.',
    future: 'The candidate availability email link will be resent.',
    error:
      'There was an error resending the candidate availability email link.',
  },
  CANCEL_INTERVIEW_MEETINGS: {
    past: 'The interview meetings were cancelled.',
    present: 'Cancelling the interview meetings.',
    future: 'The interview meetings will be cancelled.',
    error: 'There was an error cancelling the interview meetings.',
  },
  MEETING_CANCEL_INFORM_INTERVIEWER_ORGANIZER: {
    past: 'The interviewer and organizer were informed about the meeting cancellation.',
    present:
      'Informing the interviewer and organizer about the meeting cancellation.',
    future:
      'The interviewer and organizer will be informed about the meeting cancellation.',
    error:
      'There was an error informing the interviewer and organizer about the meeting cancellation.',
  },
  REPLACE_ALTERNATIVE_INTERVIEWER: {
    past: 'An alternative interviewer was replaced.',
    present: 'Replacing an alternative interviewer.',
    future: 'An alternative interviewer will be replaced.',
    error: 'There was an error replacing the alternative interviewer.',
  },
  SEND_INTERVIEWER_ATTENDANCE_RSVP: {
    past: "The Slack RSVP for the interviewer's attendance was sent.",
    present: "Sending Slack RSVP for the interviewer's attendance.",
    future: "The Slack RSVP for the interviewer's attendance will be sent.",
    error:
      "There was an error sending the Slack RSVP for the interviewer's attendance.",
  },
  SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK: {
    past: 'The availability link for the first follow-up has been scheduled.',
    present: 'Scheduling the availability link for the first follow-up.',
    future: 'The availability link for the first follow-up will be scheduled.',
    error:
      'An error occurred while scheduling the availability link for the first follow-up.',
  },
  SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE: {
    past: 'The follow-up email for self-scheduling has been scheduled.',
    present: 'Scheduling the follow-up email for self-scheduling.',
    future: 'The follow-up email for self-scheduling will be scheduled.',
    error:
      'An error occurred while scheduling the follow-up email for self-scheduling.',
  },
};
