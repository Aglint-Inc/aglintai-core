export interface EmailPayloads {
  application_received: {
    application_id: string;
  };
  availability_request_reminder: {
    session_id: string;
    application_id: string;
    schedule_id: string;
    filter_id: string;
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
    recruiter_user_id: string;
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
    recruiter_user_id: string;
  };
  confirmation_mail_to_organizer: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    recruiter_user_id: string;
  };

  debrief_calendar_invite: {
    session_id: string[];
    application_id: string;
    meeting_id: string;
    recruiter_user_id: string;
  };

  init_email_agent: {
    meeting_id: string;
    filter_id: string;
  };
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
    session_ids: string[];
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
  self_schedule_request_reminder: {
    meeting_id: string;
    filter_id: string;
  };
  upcoming_interview_reminder_candidate: {
    application_id: string;
  };
  upcoming_interview_reminder_interviewers: {
    application_id: string;
    meeting_id: string;
    recruiter_user_id: string;
  };
}
