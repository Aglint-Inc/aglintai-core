import { DatabaseEnums } from '@aglint/shared-types';

type TagType =
  | 'Aglint Ai'
  | 'Candidate'
  | 'Self Schedule'
  | 'Availability'
  | 'Cancel Interview'
  | 'Reschedule Interview'
  | 'Reminder Interview'
  | 'Cancel Interview'
  | 'Confirm Interview'
  | 'Debreif'
  | 'Email Agent'
  | 'Slack';
type EmailTemplatType = {
  heading: string;
  description: string;
};
type CompanyEmailType = Record<
  DatabaseEnums['email_slack_types'],
  EmailTemplatType
>;

export const emailTemplateCopy: CompanyEmailType = {
  agent_email_candidate: {
    heading: 'Email Agent',
    description:
      'Initial email sent by the agent to the candidate asking them to choose their preferred date and time for the interview.',
  },
  confInterview_email_organizer: {
    heading: 'Organizer Interview Confirmation',
    description:
      'Calendar invite sent to the organizer with confirmed interview date and time details.',
  },
  confirmInterview_email_applicant: {
    heading: 'Candidate Interview Confirmation',
    description:
      'Calendar invite sent to the candidate with confirmation of interview date and time details.',
  },
  debrief_email_interviewer: {
    heading: 'Debrief Invitation',
    description:
      'Used to invite relevant team members to a debrief session after interviews to discuss candidate evaluations.',
  },
  interReschedReq_email_recruiter: {
    heading: 'Candidate Reschedule Interview Request',
    description: 'Candidate raises Request Reschedule',
  },
  interviewCancel_email_applicant: {
    heading: 'Candidate Cancel Interview Notice',
    description: 'Cancel interview Email sent to candidate',
  },
  InterviewCancelReq_email_recruiter: {
    heading: 'Candidate Cancel Interview Request',
    description: 'Request from candidate to cancel interview',
  },
  interviewReschedule_email_applicant: {
    heading: 'Recruiter Reschedule',
    description:
      'This template is used for sending mail to candidate about rescheduling. Ensure to include clear instructions and personalize the email for better engagement.',
  },
  interviewStart_email_applicant: {
    heading: 'Candidate Interview Reminder',
    description:
      'A reminder or heads-up email sent to the candidate by the system.',
  },
  interviewStart_email_interviewers: {
    heading: 'Interviewer Interview Reminder',
    description:
      'A reminder or heads-up email sent to the interviewer by the system.',
  },
  selfScheduleReminder_email_applicant: {
    heading: 'Self-Schedule Remainder',
    description:
      'Email sent to the candidate when they have not responded to the initial self-schedule link.',
  },
  sendAvailabilityRequest_email_applicant: {
    heading: 'Availability Request',
    description:
      'This template is used for sending the candidate booking link to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
  },
  sendAvailReqReminder_email_applicant: {
    heading: 'Availability Request Reminder',
    description:
      'This template is used for sending remainder to the candidate to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
  },
  sendSelfScheduleRequest_email_applicant: {
    heading: 'Self-Schedule Request',
    description:
      'An intial email sent by organizer to the candidate to self-schedule the interview.',
  },
  availabilityReqResend_email_candidate: {
    heading: 'Availability Re Request',
    description:
      'This email template is used to resend availability request to the candidate. Ensure to include clear instructions and personalize the email for better engagement.',
  },
  applicantReject_email_applicant: {
    heading: 'Application Rejected',
    description: '',
  },
  applicationRecieved_email_applicant: {
    heading: 'Application Recieved',
    description: '',
  },

  interviewDetails_calender_interviewer: {
    heading: 'Interview Scheduled : Candidate Details',
    description: '',
  },
  rescheduleSelfSchedule_email_applicant: {
    heading: 'Self-Schedule Re Request',
    description: '',
  },
  interviewStart_email_organizer: {
    heading: 'Organizer Interview Reminder',
    description: '',
  },
  meetingDeclined_email_organizer: {
    heading: 'Interviewer Interview Accepted',
    description: 'Meeting accepted by interviewer',
  },
  meetingAccepted_email_organizer: {
    heading: 'Interviewer Interview Declined',
    description: 'Meeting declined by interviewer',
  },
  interviewEnd_slack_interviewers: {
    heading: 'ss',
    description: '',
  },
  interviewerConfirmation_slack_interviewers: {
    heading: '',
    description: '',
  },
  interviewStart_slack_interviewers: {
    heading: 'Slack Interview Reminder',
    description: 'Slack Interview Reminder',
  },
  phoneScreen_email_candidate: null,
  phoneScreenRemind_email_applicant: null,
};
