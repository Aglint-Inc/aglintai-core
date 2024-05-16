export type EmailTempPath =
  | 'candidate_availability_request'
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'cancel_interview_session'
  | 'init_email_agent'
  | 'confirmation_mail_to_organizer'
  | 'candidate_reschedule_request'
  | 'candidate_cancle_request'
  | 'recruiter_rescheduling_email';

export type EmailTemplatType = {
  listing: string;
  heading: string;
  triggerInfo: string;
  description: string;
  descriptionInJob: string; // Note: You might want to specify the type for this property
  subjectPlaceHolder: string;
  bodyPlaceHolder: string;
  trigger: string;
  dynamicContent: string;
};

export type CompanyEmailsType = Record<EmailTempPath, EmailTemplatType>;
