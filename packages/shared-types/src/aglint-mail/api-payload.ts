import v from 'valibot';
import { DatabaseEnums } from '..';
import {
  agentEmailCandidateSchema,
  applicantRejectEmailApplicantSchema,
  applicationRecievedEmailApplicantSchema,
  confInterviewEmailOrganizerSchema,
  confirmInterviewEmailApplicantSchema,
  debriefEmailInterviewerSchema,
  interReschedReqEmailRecruiterSchema,
  interviewCancelReqEmailRecruiterSchema,
  interviewRescheduleEmailApplicantSchema,
  interviewStartEmailApplicantSchema,
  interviewStartEmailInterviewersSchema,
  phoneScreenEmailCandidateSchema,
  phoneScreenRemindEmailApplicantSchema,
  selfScheduleReminderEmailApplicantSchema,
  sendAvailReqReminderEmailApplicant,
  sendAvailabilityRequestEmailApplicantSchema,
  sendSelfScheduleRequest_email_applicant,
} from './api_schema';
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
      '{{ interviewerFirstName }}': string;
      '{{ companyName }}': string;
      '{{ candidateFirstName }}': string;
      '{{ jobTitle }}': string;
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
      '{{ candidateFirstName }}': string;
      '{{ jobTitle }}': string;
      '{{ companyName }}': string;
      '{{ supportLink }}': string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  interviewCancel_email_applicant: {
    api_payload: v.InferInput<typeof applicationRecievedEmailApplicantSchema>;
    comp_email_placeholders: {};
    react_email_placeholders: {
      subject: string;
    };
  };
  agent_email_candidate: {
    api_payload: v.InferInput<typeof agentEmailCandidateSchema>;
    comp_email_placeholders: {
      '{{ candidateFirstName }}': string;
      '{{ companyName }}': string;
      '{{ jobRole }}': string;
      '{{ startDate }}': string;
      '{{ endDate }}': string;
      '{{ recruiterTimeZone }}': string;
      '{{ selfScheduleLink }}': string;
      '{{ recruiterFullName }}': string;
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
      '{{ recruiterFirstName }}': string;
      '{{ candidateFirstName }}': string;
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
      '{{ candidateFirstName }}': string;
      '{{ jobTitle }}': string;
      '{{ companyName }}': string;
      '{{ supportLink }}': string;
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
      '{{ candidateFirstName }}': string;
      '{{ jobTitle }}': string;
      '{{ companyName }}': string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
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
      '{{ candidateFirstName }}': string;
      '{{ jobTitle }}': string;
      '{{ companyName }}': string;
      '{{ phoneScreeningLink }}': string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
    };
  };
  InterviewCancelReq_email_recruiter: {
    api_payload: v.InferInput<typeof interviewCancelReqEmailRecruiterSchema>;
    comp_email_placeholders: {};
    react_email_placeholders: {
      subject: string;
    };
  };
  interReschedReq_email_recruiter: {
    api_payload: v.InferInput<typeof interReschedReqEmailRecruiterSchema>;
    comp_email_placeholders: {
      '{{ recruiterName }}': string;
      '{{ candidateFirstName }}': string;
      '{{ rescheduleReason }}': string;
      '{{ additionalRescheduleNotes }}': string;
      '{{ dateRange }}': string;
    };
    react_email_placeholders: {
      subject: string;
      emailBody: string;
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
      resheduleLink: string;
    };
  };
  interviewReschedule_email_applicant: {
    api_payload: v.InferInput<typeof interviewRescheduleEmailApplicantSchema>;
    comp_email_placeholders: {};
    react_email_placeholders: {
      subject: string;
    };
  };
  interviewStart_email_applicant: {
    api_payload: v.InferInput<typeof interviewStartEmailApplicantSchema>;
    comp_email_placeholders: {
      '{{ candidateName }}': string;
      '{{ companyName }}': string;
      '{{ jobTitle }}': string;
      '{{ date }}': string;
      '{{ time }}': string;
      '{{ candidateLink }}': string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
    };
  };
  interviewStart_email_interviewers: {
    api_payload: v.InferInput<typeof interviewStartEmailInterviewersSchema>;
    comp_email_placeholders: {
      '{{ companyName }}': string;
      '{{ candidateName }}': string;
      '{{ jobTitle }}': string;
      '{{ recruiterName }}': string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
      candidateLink: string;
      meetingDetails: {
        date: string;
        time: string;
        sessionType: string;
        platform: string;
        duration: string;
        sessionTypeIcon: string;
        meetingIcon: string;
      }[];
    };
  };
  sendSelfScheduleRequest_email_applicant: {
    api_payload: v.InferInput<typeof sendSelfScheduleRequest_email_applicant>;
    comp_email_placeholders: {
      '{{ candidateFirstName }}': string;
      '{{ companyName }}': string;
      '{{ jobTitle }}': string;
      '{{ selfScheduleLink }}': string;
      '{{ supportLink }}': string;
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
      '{{ candidateFirstName }}': string;
      '{{ companyName }}': string;
      '{{ jobTitle }}': string;
      '{{ availabilityReqLink }}': string;
      '{{ recruiterFullName }}': string;
      '{{ supportLink }}': string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
    };
  };
  sendAvailReqReminder_email_applicant: {
    api_payload: v.InferInput<typeof sendAvailReqReminderEmailApplicant>;
    comp_email_placeholders: {
      '{{ candidateFirstName }}': string;
      '{{ companyName }}': string;
      '{{ jobTitle }}': string;
      '{{ availabilityLink }}': string;
      '{{ recruiterFullName }}': string;
      '{{ supportLink }}': string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
    };
  };
  selfScheduleReminder_email_applicant: {
    api_payload: v.InferInput<typeof selfScheduleReminderEmailApplicantSchema>;
    comp_email_placeholders: {
      '{{ candidateFirstName }}': string;
      '{{ companyName }}': string;
      '{{ jobTitle }}': string;
      '{{ selfScheduleLink }}': string;
      '{{ supportLink }}': string;
    };
    react_email_placeholders: {
      emailBody: string;
      subject: string;
      companyLogo: string;
    };
  };
};

export type EmailTemplateAPi<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof Payloads ? Payloads[T] : never;
