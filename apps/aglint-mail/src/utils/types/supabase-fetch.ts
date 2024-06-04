// ----------------------------------------- common types
interface Common {
  recipient_email: string;
  mail_type: string;
  recruiter_id: string;
  companyLogo: string;
}

interface MeetingDetail {
  date: string;
  time: string;
  sessionType: string;
  platform: string;
  duration: string;
  sessionTypeIcon: string;
  meetingIcon: string;
}

// ----------------------------------------- for supabase fetching functions
export interface ApplicationReceivedDataType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[supportLink]': string;
  };
}

export interface CancelInterviewSessionType extends Common {
  payload: {
    '[firstName]': string;
    '[sessionName]': string;
    '[companyName]': string;
    '[jobTitle]': string;
  };
}

export interface CandidateCancelRequestType extends Common {
  payload: {
    '[firstName]': string;
    '[rescheduleReason]': string;
    '[recruiterName]': string;
    '[companyName]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetail[];
  };
}

export interface CandidateRescheduleRequestType extends Common {
  payload: {
    '[firstName]': string;
    '[rescheduleReason]': string;
    '[scheduleName]': string;
    '[companyName]': string;
    '[jobTitle]': string;
    '[DateTime]': string;
    '[pickYourSlotLink]': string;
    'meetingDetails': MeetingDetail[];
  };
}

export interface CandidateAvailabilityRequestType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    'pickYourSlot': string;
    'meetingDetails': MeetingDetail[];
  };
}

export interface CandidateInviteConfirmationType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetail[];
  };
}

export interface ConfiramtionMailToOrganizerType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[recruiterName]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetail[];
  };
}

export interface DebriefCalendarInviteBodyType extends Common {
  payload: {
    '[teamMemberName]': string;
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    'meetingLink': string;
    'meetingDetail': MeetingDetail;
  };
}

export interface InitEmailAgentType extends Common {
  payload: {
    '[candidateFirstName]': string;
    '[companyName]': string;
    '[jobRole]': string;
    '[startDate]': string;
    '[endDate]': string;
    '[companyTimeZone]': string;
    '[selfScheduleLink]': string;
  };
}

export interface InterviewType {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[supportLink]': string;
    '[interviewLink]': string;
  };
}

export interface InterviewResendType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[supportLink]': string;
    '[interviewLink]': string;
  };
}

export interface PhoneScreeningType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[phoneScreeningLink]': string;
  };
}

export interface PhoneScreeningResendType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[phoneScreeningLink]': string;
  };
}

export interface RecruiterReschedulingEmailType extends Common {
  payload: {
    '[firstName]': string;
    '[recruiterRescheduleReason]': string;
    '[scheduleName]': string;
    '[companyName]': string;
    '[pickYourSlotLink]': string;
    'meetingDetails': [];
  };
}

export interface RejectionType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
  };
}

export interface RequestCandidateSlotType extends Common {
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[availabilityLink]': string;
  };
}
