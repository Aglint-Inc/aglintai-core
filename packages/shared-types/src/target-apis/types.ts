import { z } from 'zod';
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
  candidateBookSlackInterviewerForConfirmationSchema,
  interviewEndSlackShadowTraineeForMeetingAttendenceSchema,
  interviewEndSlackRShadowTraineeForMeetingAttendenceSchema,
  onTrainingCompleteSlackApproverForTraineeMeetingQualificationSchema,
  interviewStartSlackInterviewersSchema,
  onRequestCancelSlackInterviewersOrganizerSchema,
  onReceivingAvailReqSlackSuggestSlotsSchema,
} from '../aglint-mail/api_schema';

type Payloads = {
  debrief_email_interviewer: z.infer<typeof debriefEmailInterviewerSchema>;

  applicationRecieved_email_applicant: z.infer<
    typeof applicationRecievedEmailApplicantSchema
  >;

  interviewCancel_email_applicant: z.infer<
    typeof interviewCancelEmailApplicantSchema
  >;

  agent_email_candidate: z.infer<typeof agentEmailCandidateSchema>;

  confInterview_email_organizer: z.infer<
    typeof confInterviewEmailOrganizerSchema
  >;

  confirmInterview_email_applicant: z.infer<
    typeof confirmInterviewEmailApplicantSchema
  >;

  applicantReject_email_applicant: z.infer<
    typeof applicantRejectEmailApplicantSchema
  >;

  availabilityReqResend_email_candidate: z.infer<
    typeof availabilityReqResendEmailCandidateSchema
  >;

  InterviewCancelReq_email_recruiter: z.infer<
    typeof interviewCancelReqEmailRecruiterSchema
  >;

  interReschedReq_email_recruiter: z.infer<
    typeof interReschedReqEmailRecruiterSchema
  >;

  rescheduleSelfSchedule_email_applicant: z.infer<
    typeof interviewRescheduleEmailApplicantSchema
  >;

  interviewStart_email_applicant: z.infer<
    typeof interviewStartEmailApplicantSchema
  >;

  interviewStart_email_interviewers: z.infer<
    typeof interviewStartEmailInterviewersSchema
  >;

  interviewStart_email_organizer: z.infer<
    typeof interviewStartEmailOrganizerSchema
  >;

  sendSelfScheduleRequest_email_applicant: z.infer<
    typeof sendSelfScheduleRequest_email_applicant
  >;

  sendAvailabilityRequest_email_applicant: z.infer<
    typeof sendAvailabilityRequestEmailApplicantSchema
  >;

  sendAvailReqReminder_email_applicant: z.infer<
    typeof sendAvailReqReminderEmailApplicant
  >;

  selfScheduleReminder_email_applicant: z.infer<
    typeof selfScheduleReminderEmailApplicantSchema
  >;

  meetingAccepted_email_organizer: z.infer<
    typeof MeetingAcceptedEmailOrganizerSchema
  >;

  meetingDeclined_email_organizer: z.infer<
    typeof meetingDeclinedEmailOrganizerSchema
  >;

  interviewEnd_email_interviewerForFeedback: z.infer<
    typeof interviewEndEmailInterviewerForFeedbackSchema
  >;

  onSignup_email_admin: z.infer<typeof onSignupEmailAdminSchema>;

  interviewerResumed_email_admin: z.infer<
    typeof interviewerResumedEmailAdminSchema
  >;

  interviewEnd_email_shadowTraineeForMeetingAttendence: z.infer<
    typeof onShadowCompleteEmailTraineeSchema
  >;

  interviewEnd_email_rShadowTraineeForMeetingAttendence: z.infer<
    typeof onShadowCompleteEmailTraineeSchema
  >;

  onQualified_email_trainee: z.infer<typeof onQualifiedEmailTraineeSchema>;

  onTrainingComplete_email_approverForTraineeMeetingQualification: z.infer<
    typeof onQualifiedEmailApproverSchema
  >;

  interviewEnd_email_organizerForMeetingStatus: z.infer<
    typeof interviewEndEmailOrganizerForMeetingStatusSchema
  >;

  interviewEnd_slack_interviewerForFeedback: z.infer<
    typeof interviewEndEmailInterviewerForFeedbackSchema
  >;
  candidateBook_slack_interviewerForConfirmation: z.infer<
    typeof candidateBookSlackInterviewerForConfirmationSchema
  >;
  interviewStart_slack_interviewers: z.infer<
    typeof interviewStartSlackInterviewersSchema
  >;
  onTrainingComplete_slack_approverForTraineeMeetingQualification: z.infer<
    typeof onTrainingCompleteSlackApproverForTraineeMeetingQualificationSchema
  >;
  onQualified_slack_trainee: z.infer<typeof onQualifiedEmailTraineeSchema>;
  interviewEnd_slack_rShadowTraineeForMeetingAttendence: z.infer<
    typeof interviewEndSlackRShadowTraineeForMeetingAttendenceSchema
  >;
  interviewEnd_slack_shadowTraineeForMeetingAttendence: z.infer<
    typeof interviewEndSlackShadowTraineeForMeetingAttendenceSchema
  >;
  interviewEnd_slack_organizerForMeetingStatus: z.infer<
    typeof interviewEndEmailOrganizerForMeetingStatusSchema
  >;
  onRequestCancel_slack_interviewersOrganizer: z.infer<
    typeof onRequestCancelSlackInterviewersOrganizerSchema
  >;
  onReceivingAvailReq_slack_suggestSlots: z.infer<
    typeof onReceivingAvailReqSlackSuggestSlotsSchema
  >;
};

export type TargetApiPayloadType<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof Payloads ? Payloads[T] : never;
