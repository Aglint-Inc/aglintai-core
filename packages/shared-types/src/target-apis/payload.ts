import * as v from 'valibot';
import {
  debriefEmailInterviewerSchema,
  applicationRecievedEmailApplicantSchema,
  interviewCancelEmailApplicantSchema,
  agentEmailCandidateSchema,
  confInterviewEmailOrganizerSchema,
  confirmInterviewEmailApplicantSchema,
  applicantRejectEmailApplicantSchema,
  availabilityReqResendEmailCandidateSchema,
  interviewCancelReqEmailRecruiterSchema,
  interReschedReqEmailRecruiterSchema,
  interviewRescheduleEmailApplicantSchema,
  interviewStartEmailApplicantSchema,
  interviewStartEmailInterviewersSchema,
  interviewStartEmailOrganizerSchema,
  sendSelfScheduleRequest_email_applicant,
  sendAvailabilityRequestEmailApplicantSchema,
  sendAvailReqReminderEmailApplicant,
  selfScheduleReminderEmailApplicantSchema,
  MeetingAcceptedEmailOrganizerSchema,
  meetingDeclinedEmailOrganizerSchema,
  interviewEndEmailInterviewerForFeedbackSchema,
  onSignupEmailAdminSchema,
  interviewerResumedEmailAdminSchema,
  onShadowCompleteEmailTraineeSchema,
  onQualifiedEmailTraineeSchema,
  onQualifiedEmailApproverSchema,
  interviewEndEmailOrganizerForMeetingStatusSchema,
} from '../aglint-mail/api_schema';
import { DatabaseEnums } from '..';

const Payloads = {
  debrief_email_interviewer: debriefEmailInterviewerSchema,

  applicationRecieved_email_applicant: applicationRecievedEmailApplicantSchema,

  interviewCancel_email_applicant: interviewCancelEmailApplicantSchema,

  agent_email_candidate: agentEmailCandidateSchema,

  confInterview_email_organizer: confInterviewEmailOrganizerSchema,

  confirmInterview_email_applicant: confirmInterviewEmailApplicantSchema,

  applicantReject_email_applicant: applicantRejectEmailApplicantSchema,

  availabilityReqResend_email_candidate:
    availabilityReqResendEmailCandidateSchema,

  InterviewCancelReq_email_recruiter: interviewCancelReqEmailRecruiterSchema,

  interReschedReq_email_recruiter: interReschedReqEmailRecruiterSchema,

  rescheduleSelfSchedule_email_applicant:
    interviewRescheduleEmailApplicantSchema,

  interviewStart_email_applicant: interviewStartEmailApplicantSchema,

  interviewStart_email_interviewers: interviewStartEmailInterviewersSchema,

  interviewStart_email_organizer: interviewStartEmailOrganizerSchema,

  sendSelfScheduleRequest_email_applicant:
    sendSelfScheduleRequest_email_applicant,

  sendAvailabilityRequest_email_applicant:
    sendAvailabilityRequestEmailApplicantSchema,

  sendAvailReqReminder_email_applicant: sendAvailReqReminderEmailApplicant,

  selfScheduleReminder_email_applicant:
    selfScheduleReminderEmailApplicantSchema,

  meetingAccepted_email_organizer: MeetingAcceptedEmailOrganizerSchema,

  meetingDeclined_email_organizer: meetingDeclinedEmailOrganizerSchema,

  interviewEnd_email_interviewerForFeedback:
    interviewEndEmailInterviewerForFeedbackSchema,

  onSignup_email_admin: onSignupEmailAdminSchema,

  interviewerResumed_email_admin: interviewerResumedEmailAdminSchema,

  interviewEnd_email_shadowTraineeForMeetingAttendence:
    onShadowCompleteEmailTraineeSchema,

  interviewEnd_email_rShadowTraineeForMeetingAttendence:
    onShadowCompleteEmailTraineeSchema,

  onQualified_email_trainee: onQualifiedEmailTraineeSchema,

  onTrainingComplete_email_approverForTraineeMeetingQualification:
    onQualifiedEmailApproverSchema,

  interviewEnd_email_organizerForMeetingStatus:
    interviewEndEmailOrganizerForMeetingStatusSchema,

  interviewEnd_slack_interviewerForFeedback:
    interviewEndEmailInterviewerForFeedbackSchema,
} as const;

export type TargetApiSchema<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof typeof Payloads ? (typeof Payloads)[T] : never;
