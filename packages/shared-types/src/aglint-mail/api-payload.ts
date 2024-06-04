export interface EmailPayloads {
  application_received: {
    application_id: string;
  };
  cancel_interview_session: {
    application_id: string;
    session_id: string;
  };
  candidate_availability_request: {
    session_id: string[];
    application_id: string;
    schedule_id: string;
    filter_id: string;
  };
  candidate_cancel_request: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    interview_cancel_id: string;
  };
  candidate_invite_confirmation: {
    session_id: string[];
    application_id: string;
    schedule_id: string;
    filter_id: string;
  };
  candidate_reschedule_request: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    interview_cancel_id: string;
  };
  confirmation_mail_to_organizer: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
  };

  debrief_calendar_invite: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    recruiter_user_id: string;
  };

  // init_email_agent: {
  //   recipient_email: string;
  //   mail_type: string;
  //   recruiter_id: string;
  //   payload: {
  //     "[companyName]": string;
  //     "[candidateFirstName]": string;
  //     "[jobRole]": string;
  //     "[companyTimeZone]": string;
  //     "[startDate]": string;
  //     "[endDate]": string;
  //     "[selfScheduleLink]": string;
  //     meetingDetails: {
  //       dateTime: string;
  //       type: string;
  //       platform: string;
  //       duration: string;
  //       link: string;
  //     };
  //   };
  // };
  interview: {
    application_id: string;
  };
  interview_resend: {
    application_id: string;
  };

  phone_screening: {
    application_id: string;
  };
  phone_screening_resend: {
    application_id: string;
  };
  recruiter_rescheduling_email: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    interview_cancel_id: string;
  };
  rejection: {
    application_id: string;
  };
  request_candidate_slot: {
    application_id: string;
    request_id: string;
  };
}
