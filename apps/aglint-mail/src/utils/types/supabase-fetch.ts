import type { MeetingDetails } from './apiTypes';

// ----------------------------------------- common types
interface Common {
  recipient_email: string;
  mail_type: string;
  recruiter_id: string;
  companyLogo: string;
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
    '[companyName]': string;
    '[jobTitle]': string;
    'meetingDetails': MeetingDetails[];
  };
}

export interface CandidateCancelRequestType extends Common {
  payload: {
    '[firstName]': string;
    '[rescheduleReason]': string;
    '[recruiterName]': string;
    '[companyName]': string;
    '[additionalRescheduleNotes]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetails[];
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
    'meetingDetails': MeetingDetails[];
  };
}

export interface CandidateAvailabilityRequestType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    'pickYourSlot': string;
    'meetingDetails': MeetingDetails[];
  };
}

export interface CandidateInviteConfirmationType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetails[];
  };
}

export interface ConfiramtionMailToOrganizerType extends Common {
  payload: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[recruiterName]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetails[];
  };
}

export interface DebriefCalendarInviteBodyType extends Common {
  payload: {
    '[teamMemberName]': string;
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    'meetingLink': string;
    'meetingDetail': MeetingDetails;
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

export interface InterviewType extends Common {
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
    'meetingDetails': MeetingDetails[];
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
