export interface EmailPayloads {
  application_received: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[firstName]': string;
      '[jobTitle]': string;
      '[supportLink]': string;
    };
  };
  cancel_interview_session: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[firstName]': string;
      '[sessionName]': string;
      '[jobTitle]': string;
    };
  };
  candidate_availability_request: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[firstName]': string;
      '[scheduleName]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  candidate_cancel_request: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[recruiterName]': string;
      '[firstName]': string;
      '[rescheduleReason]': string;
      '[additionalRescheduleNotes]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  candidate_invite_confirmation: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[firstName]': string;
      '[viewDetailsLink]': string;
      '[companyName]': string;
      '[jobTitle]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  candidate_reschedule_request: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[recruiterName]': string;
      '[firstName]': string;
      '[dateRange]': string;
      '[rescheduleReason]': string;
      '[additionalRescheduleNotes]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  confirmation_mail_to_organizer: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[recruiterName]': string;
      '[meetingLink]': string;
      '[candidateFirstName]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };

  debrief_calendar_invite: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[teamMemberName]': string;
      '[firstName]': string;
      '[jobTitle]': string;
      '[companyName]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };

  init_email_agent: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[candidateFirstName]': string;
      '[jobRole]': string;
      '[companyTimeZone]': string;
      '[startDate]': string;
      '[endDate]': string;
      '[selfScheduleLink]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  interview: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[firstName]': string;
      '[jobTitle]': string;
      '[interviewLink]': string;
      '[supportLink]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  interview_resend: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[jobTitle]': string;
      '[companyName]': string;
      '[firstName]': string;
      '[interviewLink]': string;
      '[supportLink]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };

  phone_screening: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[firstName]': string;
      '[jobTitle]': string;
      '[companyName]': string;
      '[phoneScreeningLink]': string;
    };
  };
  phone_screening_resend: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[firstName]': string;
      '[jobTitle]': string;
      '[companyName]': string;
      '[phoneScreeningLink]': string;
    };
  };
  recruiter_rescheduling_email: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[jobTitle]': string;
      '[firstName]': string;
      '[recruiterRescheduleReason]': string;
      '[scheduleName]': string;
      '[pickYourSlotLink]': string;
      '[companyName]': string;
      meetingDetails: {
        dateTime: string;
        type: string;
        platform: string;
        duration: string;
        link: string;
      };
    };
  };
  rejection: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[companyName]': string;
      '[firstName]': string;
      '[jobTitle]': string;
    };
  };
  request_candidate_slot: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {
      '[jobTitle]': string;
      '[firstName]': string;
      '[availabilityLink]': string;
      '[companyName]': string;
    };
  };
}
