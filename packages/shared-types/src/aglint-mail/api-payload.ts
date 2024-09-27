import { DatabaseEnums } from '..';
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
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['applicationRecieved_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewCancel_email_applicant: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewCancel_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  agent_email_candidate: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['agent_email_candidate'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  confInterview_email_organizer: {
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
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['applicantReject_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  availabilityReqResend_email_candidate: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['availabilityReqResend_email_candidate'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  InterviewCancelReq_email_recruiter: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['InterviewCancelReq_email_recruiter'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };
  interReschedReq_email_recruiter: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interReschedReq_email_recruiter'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetails: MeetingDetailCardType[];
    };
  };

  rescheduleSelfSchedule_email_applicant: {
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
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewStart_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewStart_email_interviewers: {
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
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendSelfScheduleRequest_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      selfScheduleLink: string;
    };
  };
  sendAvailabilityRequest_email_applicant: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendAvailabilityRequest_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  sendAvailReqReminder_email_applicant: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['sendAvailReqReminder_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      availabilityReqLink: string;
    };
  };
  selfScheduleReminder_email_applicant: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['selfScheduleReminder_email_applicant'][number]]: string;
    };
    react_email_placeholders: {
      selfScheduleLink: string;
      companyLogo: string;
    };
  };

  meetingAccepted_email_organizer: {
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
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['meetingDeclined_email_organizer'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingDetail: MeetingDetailCardType;
    };
  };
  interviewEnd_email_interviewerForFeedback: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_interviewerForFeedback'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      interviewFeedbackLink: string;
    };
  };
  onSignup_email_admin: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onSignup_email_admin'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewerResumed_email_admin: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewerResumed_email_admin'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_shadowTraineeForMeetingAttendence: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_shadowTraineeForMeetingAttendence'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_rShadowTraineeForMeetingAttendence: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_rShadowTraineeForMeetingAttendence'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  onQualified_email_trainee: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onQualified_email_trainee'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  onTrainingComplete_email_approverForTraineeMeetingQualification: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['onTrainingComplete_email_approverForTraineeMeetingQualification'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
    };
  };
  interviewEnd_email_organizerForMeetingStatus: {
    comp_email_placeholders: {
      [key in (typeof emailVariablePayloads)['interviewEnd_email_organizerForMeetingStatus'][number]]: string;
    };
    react_email_placeholders: {
      companyLogo: string;
      meetingStatusUpdateLink: string;
    };
  };
  interviewEnd_slack_interviewerForFeedback: {
    comp_email_placeholders: {};
    react_email_placeholders: {};
  };
};

export type EmailTemplateAPi<T extends DatabaseEnums['email_slack_types']> =
  T extends keyof Payloads ? Payloads[T] : never;
