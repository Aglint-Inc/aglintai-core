import { EmailTemplateFields } from '@aglint/shared-types';
export type EmailTempPath =
  | 'candidate_availability_request'
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'cancel_interview_session'
  | 'init_email_agent'
  | 'confirmation_mail_to_organizer'
  | 'candidate_reschedule_request'
  | 'candidate_cancel_request'
  | 'recruiter_rescheduling_email';

export type EmailDynamicParams<T extends EmailTempPath> = {
  init_email_agent: {
    '[candidateFirstName]': string;
    '[companyName]': string;
    '[jobRole]': string;
    '[endDate]': string;
    '[startDate]': string;
    '[companyTimeZone]': string;
    '[candidateTimeZone]': string;
    '[selfScheduleLink]': string;
  };
  confirmation_mail_to_organizer: {
    '[recruiterName]': string;
    '[firstName]': string;
    '[meetingLink]': string;
    '[companyName]': string;
  };
  candidate_reschedule_request: never;
  candidate_cancel_request: never;
  recruiter_rescheduling_email: never;
  candidate_availability_request: never;
  candidate_invite_confirmation: {
    '[companyName]': string;
    '[schedule_name]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[viewDetailsLink]': string;
  };
  debrief_calendar_invite: never;
  cancel_interview_session: never;
}[T];

export type EmailFillBody<T extends EmailTempPath> = {
  template: EmailTemplateFields;
  payload: EmailDynamicParams<T>;
};

// function fillEmail<T extends EmailTempPath>(templatePath: T, template:, payload: EmailDynamicParams<T>): EmailFillBody<T> {
//   return {
//     template: /* your template */,
//     payload: payload,
//   };
// }

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
export type CompanyEmailsTypeDB = Record<EmailTempPath, EmailTemplateFields>;
