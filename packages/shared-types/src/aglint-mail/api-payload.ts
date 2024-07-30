import v from 'valibot';
import { DatabaseEnums } from '..';
import {
  MeetingAcceptedEmailOrganizerSchema,
  agentEmailCandidateSchema,
  applicantRejectEmailApplicantSchema,
  applicationRecievedEmailApplicantSchema,
  availabilityReqResendEmailCandidateSchema,
  confInterviewEmailOrganizerSchema,
  confirmInterviewEmailApplicantSchema,
  debriefEmailInterviewerSchema,
  interReschedReqEmailRecruiterSchema,
  interviewCancelEmailApplicantSchema,
  interviewCancelReqEmailRecruiterSchema,
  interviewEndEmailInterviewerForFeedbackSchema,
  interviewEndEmailOrganizerForMeetingStatusSchema,
  interviewRescheduleEmailApplicantSchema,
  interviewStartEmailApplicantSchema,
  interviewStartEmailInterviewersSchema,
  interviewStartEmailOrganizerSchema,
  interviewerResumedEmailAdminSchema,
  meetingDeclinedEmailOrganizerSchema,
  onQualifiedEmailApproverSchema,
  onQualifiedEmailTraineeSchema,
  onShadowCompleteEmailTraineeSchema,
  onSignupEmailAdminSchema,
  selfScheduleReminderEmailApplicantSchema,
  sendAvailReqReminderEmailApplicant,
  sendAvailabilityRequestEmailApplicantSchema,
  sendSelfScheduleRequest_email_applicant,
} from './api_schema';
import { emailVariablePayloads } from '@aglint/shared-utils';
export type MeetingDetailCardType = {
  date: string;
  time: string;
  sessionType: string;
  platform: string;
  duration: string;
  sessionTypeIcon: string;
  meetingIcon: string;
};

type Payloads = {
  debrief_email_interviewer: {
    api_payload: v.InferInput<typeof debriefEmailInterviewerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['debrief_email_interviewer'][number]]: string;
    };
    react_email_placeholders: {
      meetingDetails: MeetingDetailCardType;
      companyLogo: string;
      candidateLink: string;
    };
  };
  applicationRecieved_email_applicant: {
    api_payload: v.InferInput<typeof applicationRecievedEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['applicationRecieved_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewCancel_email_applicant: {
    api_payload: v.InferInput<typeof interviewCancelEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewCancel_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  agent_email_candidate: {
    api_payload: v.InferInput<typeof agentEmailCandidateSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['agent_email_candidate'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  confInterview_email_organizer: {
    api_payload: v.InferInput<typeof confInterviewEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['confInterview_email_organizer'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;

      meetingDetails: MeetingDetailCardType;
      candidateDetails: string;
    };
  };
  confirmInterview_email_applicant: {
    api_payload: v.InferInput<typeof confirmInterviewEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['confirmInterview_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
      candidateLink: string;
    };
  };
  applicantReject_email_applicant: {
    api_payload: v.InferInput<typeof applicantRejectEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['applicantReject_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  availabilityReqResend_email_candidate: {
    api_payload: v.InferInput<typeof availabilityReqResendEmailCandidateSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['availabilityReqResend_email_candidate'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  InterviewCancelReq_email_recruiter: {
    api_payload: v.InferInput<typeof interviewCancelReqEmailRecruiterSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['InterviewCancelReq_email_recruiter'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  interReschedReq_email_recruiter: {
    api_payload: v.InferInput<typeof interReschedReqEmailRecruiterSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interReschedReq_email_recruiter'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };

  rescheduleSelfSchedule_email_applicant: {
    api_payload: v.InferInput<typeof interviewRescheduleEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['rescheduleSelfSchedule_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      resheduleLink: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };

  interviewStart_email_applicant: {
    api_payload: v.InferInput<typeof interviewStartEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewStart_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewStart_email_interviewers: {
    api_payload: v.InferInput<typeof interviewStartEmailInterviewersSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewStart_email_interviewers'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      candidateLink: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  interviewStart_email_organizer: {
    api_payload: v.InferInput<typeof interviewStartEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewStart_email_organizer'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      candidateLink: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  sendSelfScheduleRequest_email_applicant: {
    api_payload: v.InferInput<typeof sendSelfScheduleRequest_email_applicant>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendSelfScheduleRequest_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      selfScheduleLink: string;
    };
  };
  sendAvailabilityRequest_email_applicant: {
    api_payload: v.InferInput<
      typeof sendAvailabilityRequestEmailApplicantSchema
    >;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendAvailabilityRequest_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  sendAvailReqReminder_email_applicant: {
    api_payload: v.InferInput<typeof sendAvailReqReminderEmailApplicant>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendAvailReqReminder_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  selfScheduleReminder_email_applicant: {
    api_payload: v.InferInput<typeof selfScheduleReminderEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['selfScheduleReminder_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      selfScheduleLink: string;
      companyLogo: string;
    };
  };

  meetingAccepted_email_organizer: {
    api_payload: v.InferInput<typeof MeetingAcceptedEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['meetingAccepted_email_organizer'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetailsLink: string;
      candidateScheduleLink: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  meetingDeclined_email_organizer: {
    api_payload: v.InferInput<typeof meetingDeclinedEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['meetingDeclined_email_organizer'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewEnd_email_interviewerForFeedback: {
    api_payload: v.InferInput<
      typeof interviewEndEmailInterviewerForFeedbackSchema
    >;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_interviewerForFeedback'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      interviewFeedbackLink: string;
    };
  };
  onSignup_email_admin: {
    api_payload: v.InferInput<typeof onSignupEmailAdminSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onSignup_email_admin'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewerResumed_email_admin: {
    api_payload: v.InferInput<typeof interviewerResumedEmailAdminSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewerResumed_email_admin'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_shadowTraineeForMeetingAttendence: {
    api_payload: v.InferInput<typeof onShadowCompleteEmailTraineeSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_shadowTraineeForMeetingAttendence'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_rShadowTraineeForMeetingAttendence: {
    api_payload: v.InferInput<typeof onShadowCompleteEmailTraineeSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_rShadowTraineeForMeetingAttendence'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  onQualified_email_trainee: {
    api_payload: v.InferInput<typeof onQualifiedEmailTraineeSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onQualified_email_trainee'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  onTrainingComplete_email_approverForTraineeMeetingQualification: {
    api_payload: v.InferInput<typeof onQualifiedEmailApproverSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onTrainingComplete_email_approverForTraineeMeetingQualification'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_organizerForMeetingStatus: {
    api_payload: v.InferInput<
      typeof interviewEndEmailOrganizerForMeetingStatusSchema
    >;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_organizerForMeetingStatus'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingStatusUpdateLink: string;
    };
  };
  interviewEnd_slack_interviewerForFeedback: {
    api_payload: v.InferInput<
      typeof interviewEndEmailInterviewerForFeedbackSchema
    >;
    comp_email_placeholders: {};
    react_email_placeholders: {};
  };
};

export type EmailTemplateAPi<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof Payloads ? Payloads[T] : never;
