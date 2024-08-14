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
    description: `This email template is used to confirm the interview schedule for the organizer. This email is sent by the system automatically every time an interview is confirmed for the organizer.`,
  },
  confirmInterview_email_applicant: {
    heading: 'Candidate Interview Confirmation',
    description: `This email template is used to confirm a candidate's interview schedule. This email is sent by the system automatically every time an interview is confirmed for the candidate.`,
  },
  debrief_email_interviewer: {
    heading: 'Debrief Invitation',
    description:
      'Used to invite relevant team members to a debrief session after interviews to discuss candidate evaluations.',
  },
  interReschedReq_email_recruiter: {
    heading: 'Candidate Reschedule Interview Request',
    description:
      'This email template is used to request the rescheduling of a scheduled interview by a candidate. This email is sent by the system automatically every time a candidate requests to reschedule an interview.',
  },
  interviewCancel_email_applicant: {
    heading: 'Candidate Cancel Interview Notice',
    description: `This email template informs a job candidate about the cancellation of their scheduled interview.`,
  },
  InterviewCancelReq_email_recruiter: {
    heading: 'Candidate Cancel Interview Request',
    description: `This email template is used to notify organizer when a candidate cancels a scheduled interview. This email is sent by the system automatically every time a candidate cancels an interview.`,
  },
  interviewReschedule_email_applicant: {
    heading: '',
    description: '',
  },
  interviewStart_email_applicant: {
    heading: 'Candidate Interview Reminder',
    description: `This email template is used to send a reminder to the candidate about their upcoming interview. This email is sent by the system automatically before the interview.`,
  },
  interviewStart_email_interviewers: {
    heading: 'Interviewer Interview Reminder',
    description:
      'This email template is used to send a reminder to the interviewer about their upcoming interview. This email is sent by the system automatically before the interview.',
  },
  selfScheduleReminder_email_applicant: {
    heading: 'Self-Schedule Reminder',
    description:
      'Email sent to the candidate when they have not responded to the initial self-schedule link.',
  },
  sendAvailabilityRequest_email_applicant: {
    heading: 'Availability Request',
    description: `This email template is used to request a candidate's availability for scheduling interviews. This email is sent by the system automatically every time availability is requested.`,
  },
  sendAvailReqReminder_email_applicant: {
    heading: 'Availability Request Reminder',
    description: `This email template is used to send a reminder to candidates to provide their availability for scheduling interviews. You can use the workflow feature to enable this reminder automatically.`,
  },
  sendSelfScheduleRequest_email_applicant: {
    heading: 'Self-Schedule Request',
    description:
      'An intial email sent by organizer to the candidate to self-schedule the interview.',
  },
  availabilityReqResend_email_candidate: {
    heading: 'Availability Re Request',
    description: `This email template is used to re-request a candidate's availability for scheduling interviews. This email is sent by the system automatically every time availability is re-requested.`,
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
    heading: 'Interviewer Interview Confirmation',
    description: `This email template is used to confirm the interview schedule for the interviewer. This email is sent by the system automatically every time an interview is confirmed for the interviewer.
`,
  },
  rescheduleSelfSchedule_email_applicant: {
    heading: 'Self-Schedule Re Request',
    description: `This email template is used to re-request a candidate to self-schedule their interview. This email is sent by the system automatically every time a self-schedule is re-requested.`,
  },
  interviewStart_email_organizer: {
    heading: 'Organizer Interview Reminder',
    description:
      'This email template is used to send a reminder to the organizer about the upcoming interview. This email is sent by the system automatically before the interview.',
  },
  meetingDeclined_email_organizer: {
    heading: 'Interviewer Interview Declined',
    description:
      'This email template is used to notify organizer when an interviewer declines an interview invitation. This email is sent by the system automatically every time an interviewer declines an interview.',
  },
  meetingAccepted_email_organizer: {
    heading: 'Interviewer Interview Accepted',
    description:
      'This email template is used to notify organizer when an interviewer accepts an interview invitation. This email is sent by the system automatically every time an interviewer accepts an interview.',
  },
  interviewEnd_slack_interviewers: {
    heading: '',
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
  onSignup_email_admin: {
    heading: '',
    description: '',
  },
  onInvite_email_user: {
    heading: '',
    description: '',
  },
  interviewerResumed_email_admin: {
    heading: 'Interviewer Resumed',
    description:
      'When the interviewer resumed automatically, this email will be sent.',
  },
  interviewEnd_email_shadowTraineeForMeetingAttendence: {
    heading: 'Shadow Trainee Meeting Attendence',
    description: '',
  },
  interviewEnd_email_rShadowTraineeForMeetingAttendence: {
    heading: 'Reverse Shadow Trainee Meeting Attendence',
    description: '',
  },
  onQualified_email_trainee: {
    heading: 'Qualified Trainee',
    description: 'after qualified a trainee this mail is send to trainee',
  },
  onTrainingComplete_email_approverForTraineeMeetingQualification: {
    heading: 'Qualified Confirmation Approver',
    description: 'qualified trainee confirmation for approver',
  },
  interviewEnd_email_organizerForMeetingStatus: {
    heading: 'Interview End Status Update',
    description:
      'After interview end this mail is send to organizer for ask to update the meeting status',
  },
  phoneScreen_email_candidate: null,
  phoneScreenRemind_email_applicant: null,
  candidateBook_email_interviewerForFeedback: null,
  candidateBook_slack_interviewerForFeedback: null,
  candidateBook_slack_interviewerForConfirmation: null,
  interviewEnd_email_interviewerForFeedback: {
    heading: 'Inteview Feedback from interviewer',
    description:
      'After interview end this mail is send to interviewer for asking feedback',
  },
  interviewEnd_slack_interviewerForFeedback: {
    heading: 'Inteview Feedback from interviewer',
    description:
      'After interview ends slack message will go to interviewer for asking feedback',
  },
  onQualified_email_approved: null,
  onQualified_slack_approved: null,
  onQualified_slack_trainee: {
    heading: 'Notify of Trainee Qualify',
    description: '',
  },
  onTrainingComplete_slack_approverForTraineeMeetingQualification: {
    heading: 'Interview Type Trainee Approval',
    description: '',
  },
  interviewEnd_slack_organizerForMeetingStatus: {
    heading: 'Meeting Complete Status',
    description: '',
  },
  interviewEnd_slack_shadowTraineeForMeetingAttendence: {
    heading: 'Shadow Trainee Meeting Attendence',
    description: '',
  },
  interviewEnd_slack_rShadowTraineeForMeetingAttendence: {
    heading: 'Reverse Shadow Trainee Meeting Attendence',
    description: '',
  },
  onAvailReqAgent_emailAgent_getCandidateAvailability: {
    heading: '',
    description: '',
  },
  onAvailReqAgent_emailLink_getCandidateAvailability: null,
  onReceivingAvailReq_agent_sendSelfScheduleRequest: null,
  onReceivingAvailReq_agent_confirmSlot: null,
  onSelfScheduleReqAgent_EmailAgent_SelfSchedule: null,
  onSelfScheduleReqAgent_PhoneAgent_SelfSchedule: null,
  onSelfScheduleReqAgent_EmailLink_SelfSchedule: null,
  onRequestReschedule_emailLink_resendAvailRequest: null,
  onRequestCancel_agent_cancelEvents: null,
  onRequestCancel_slack_interviewersOrganizer: null,
};
