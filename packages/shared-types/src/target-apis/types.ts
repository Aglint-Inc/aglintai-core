import * as v from 'valibot';
import { DatabaseEnums } from '..';
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

type Payloads = {
  debrief_email_interviewer: v.InferInput<typeof debriefEmailInterviewerSchema>;

  applicationRecieved_email_applicant: v.InferInput<
    typeof applicationRecievedEmailApplicantSchema
  >;

  interviewCancel_email_applicant: v.InferInput<
    typeof interviewCancelEmailApplicantSchema
  >;

  agent_email_candidate: v.InferInput<typeof agentEmailCandidateSchema>;

  confInterview_email_organizer: v.InferInput<
    typeof confInterviewEmailOrganizerSchema
  >;

  confirmInterview_email_applicant: v.InferInput<
    typeof confirmInterviewEmailApplicantSchema
  >;

  applicantReject_email_applicant: v.InferInput<
    typeof applicantRejectEmailApplicantSchema
  >;

  availabilityReqResend_email_candidate: v.InferInput<
    typeof availabilityReqResendEmailCandidateSchema
  >;

  InterviewCancelReq_email_recruiter: v.InferInput<
    typeof interviewCancelReqEmailRecruiterSchema
  >;

  interReschedReq_email_recruiter: v.InferInput<
    typeof interReschedReqEmailRecruiterSchema
  >;

  rescheduleSelfSchedule_email_applicant: v.InferInput<
    typeof interviewRescheduleEmailApplicantSchema
  >;

  interviewStart_email_applicant: v.InferInput<
    typeof interviewStartEmailApplicantSchema
  >;

  interviewStart_email_interviewers: v.InferInput<
    typeof interviewStartEmailInterviewersSchema
  >;

  interviewStart_email_organizer: v.InferInput<
    typeof interviewStartEmailOrganizerSchema
  >;

  sendSelfScheduleRequest_email_applicant: v.InferInput<
    typeof sendSelfScheduleRequest_email_applicant
  >;

  sendAvailabilityRequest_email_applicant: v.InferInput<
    typeof sendAvailabilityRequestEmailApplicantSchema
  >;

  sendAvailReqReminder_email_applicant: v.InferInput<
    typeof sendAvailReqReminderEmailApplicant
  >;

  selfScheduleReminder_email_applicant: v.InferInput<
    typeof selfScheduleReminderEmailApplicantSchema
  >;

  meetingAccepted_email_organizer: v.InferInput<
    typeof MeetingAcceptedEmailOrganizerSchema
  >;

  meetingDeclined_email_organizer: v.InferInput<
    typeof meetingDeclinedEmailOrganizerSchema
  >;

  interviewEnd_email_interviewerForFeedback: v.InferInput<
    typeof interviewEndEmailInterviewerForFeedbackSchema
  >;

  onSignup_email_admin: v.InferInput<typeof onSignupEmailAdminSchema>;

  interviewerResumed_email_admin: v.InferInput<
    typeof interviewerResumedEmailAdminSchema
  >;

  interviewEnd_email_shadowTraineeForMeetingAttendence: v.InferInput<
    typeof onShadowCompleteEmailTraineeSchema
  >;

  interviewEnd_email_rShadowTraineeForMeetingAttendence: v.InferInput<
    typeof onShadowCompleteEmailTraineeSchema
  >;

  onQualified_email_trainee: v.InferInput<typeof onQualifiedEmailTraineeSchema>;

  onTrainingComplete_email_approverForTraineeMeetingQualification: v.InferInput<
    typeof onQualifiedEmailApproverSchema
  >;

  interviewEnd_email_organizerForMeetingStatus: v.InferInput<
    typeof interviewEndEmailOrganizerForMeetingStatusSchema
  >;

  interviewEnd_slack_interviewerForFeedback: v.InferInput<
    typeof interviewEndEmailInterviewerForFeedbackSchema
  >;
};

export type TargetApiPayloadType<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof Payloads ? Payloads[T] : never;
