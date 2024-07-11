import v from "valibot";
import { DatabaseEnums } from "..";
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
  interviewRescheduleEmailApplicantSchema,
  interviewStartEmailApplicantSchema,
  interviewStartEmailInterviewersSchema,
  interviewStartEmailOrganizerSchema,
  meetingDeclinedEmailOrganizerSchema,
  phoneScreenEmailCandidateSchema,
  phoneScreenRemindEmailApplicantSchema,
  selfScheduleReminderEmailApplicantSchema,
  sendAvailReqReminderEmailApplicant,
  sendAvailabilityRequestEmailApplicantSchema,
  sendSelfScheduleRequest_email_applicant,
} from "./api_schema";
import { emailVariablePayloads } from "@aglint/shared-utils";
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
      [key in (typeof emailVariablePayloads)["debrief_email_interviewer"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      meetingDetails: MeetingDetailCardType;
      companyLogo: string;
      candidateLink: string;
    };
  };
  applicationRecieved_email_applicant: {
    api_payload: v.InferInput<typeof applicationRecievedEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["applicationRecieved_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  interviewCancel_email_applicant: {
    api_payload: v.InferInput<typeof interviewCancelEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interviewCancel_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  agent_email_candidate: {
    api_payload: v.InferInput<typeof agentEmailCandidateSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["agent_email_candidate"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  confInterview_email_organizer: {
    api_payload: v.InferInput<typeof confInterviewEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["confInterview_email_organizer"][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      emailBody: string;
      subject: string;
      meetingDetails: MeetingDetailCardType;
      candidateDetails: string;
    };
  };
  confirmInterview_email_applicant: {
    api_payload: v.InferInput<typeof confirmInterviewEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["confirmInterview_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
      candidateLink: string;
    };
  };
  applicantReject_email_applicant: {
    api_payload: v.InferInput<typeof applicantRejectEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["applicantReject_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  availabilityReqResend_email_candidate: {
    api_payload: v.InferInput<typeof availabilityReqResendEmailCandidateSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["availabilityReqResend_email_candidate"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      availabilityReqLink: string;
    };
  };

  phoneScreen_email_candidate: {
    api_payload: v.InferInput<typeof phoneScreenEmailCandidateSchema>;
    comp_email_placeholders: {};
    react_email_placeholders: {
      subject: string;
    };
  };
  phoneScreenRemind_email_applicant: {
    api_payload: v.InferInput<typeof phoneScreenRemindEmailApplicantSchema>;
    comp_email_placeholders: {
      "{{ candidateFirstName }}": string;
      "{{ jobTitle }}": string;
      "{{ companyName }}": string;
      "{{ phoneScreeningLink }}": string;
      "{{ recruiterFullName }}": string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  InterviewCancelReq_email_recruiter: {
    api_payload: v.InferInput<typeof interviewCancelReqEmailRecruiterSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["InterviewCancelReq_email_recruiter"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
      meetingLink: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  interReschedReq_email_recruiter: {
    api_payload: v.InferInput<typeof interReschedReqEmailRecruiterSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interReschedReq_email_recruiter"][number]]: string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
      resheduleLink: string;
    };
  };

  rescheduleSelfSchedule_email_applicant: {
    api_payload: v.InferInput<typeof interviewRescheduleEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["rescheduleSelfSchedule_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      resheduleLink: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };

  interviewStart_email_applicant: {
    api_payload: v.InferInput<typeof interviewStartEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interviewStart_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewStart_email_interviewers: {
    api_payload: v.InferInput<typeof interviewStartEmailInterviewersSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interviewStart_email_interviewers"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      candidateLink: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  interviewStart_email_organizer: {
    api_payload: v.InferInput<typeof interviewStartEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interviewStart_email_organizer"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      candidateLink: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  sendSelfScheduleRequest_email_applicant: {
    api_payload: v.InferInput<typeof sendSelfScheduleRequest_email_applicant>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["sendSelfScheduleRequest_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
    };
  };
  sendAvailabilityRequest_email_applicant: {
    api_payload: v.InferInput<
      typeof sendAvailabilityRequestEmailApplicantSchema
    >;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["sendAvailabilityRequest_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  sendAvailReqReminder_email_applicant: {
    api_payload: v.InferInput<typeof sendAvailReqReminderEmailApplicant>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["sendAvailReqReminder_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  selfScheduleReminder_email_applicant: {
    api_payload: v.InferInput<typeof selfScheduleReminderEmailApplicantSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["selfScheduleReminder_email_applicant"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      selfScheduleLink: string;
      companyLogo: string;
    };
  };

  meetingAccepted_email_organizer: {
    api_payload: v.InferInput<typeof MeetingAcceptedEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["meetingAccepted_email_organizer"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      meetingDetailsLink: string;
      candidateScheduleLink: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  meetingDeclined_email_organizer: {
    api_payload: v.InferInput<typeof meetingDeclinedEmailOrganizerSchema>;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["meetingDeclined_email_organizer"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      meetingDetailsLink: string;
      candidateScheduleLink: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewEnd_email_interviewerForFeedback: {
    api_payload: v.InferInput<
      typeof interviewEndEmailInterviewerForFeedbackSchema
    >;
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)["interviewEnd_email_interviewerForFeedback"][number]]: string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      interviewFeedbackLink: string;
    };
  };
};

export type EmailTemplateAPi<T extends DatabaseEnums["email_slack_types"]> =
  T extends keyof Payloads ? Payloads[T] : never;
