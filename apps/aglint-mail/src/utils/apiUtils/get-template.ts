import React from 'react';
import { supabaseAdmin, supabaseWrap } from '../../supabase/supabaseAdmin';

export type EmailTemplateFields = {
  body: string;
  subject: string;
};

export type DbFetchedTypes = {
  body: string;
  default: boolean;
  subject: string;
  fromName: string;
};
const fetchTemplate = async (
  recruiter_id: string,
  mail_type: string,
  fields: any,
) => {
  const [templates] = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id)
      .eq('type', mail_type),
  );
  let data = null;
  data = fillEmail(fields, templates);

  return data;
};

export default fetchTemplate;

export const fillEmail = <T extends EmailTempPath>(
  dynamic_fields: EmailDynamicParams<T>,
  email_template: EmailTemplateFields,
): EmailTemplateFields => {
  let updated_template = null;
  if (email_template) {
    updated_template = { ...email_template };
  }
  for (let key of Object.keys(dynamic_fields)) {
    updated_template.subject = updated_template.subject.replaceAll(
      key,
      dynamic_fields[String(key)],
    );
    // updated_template.fromName = updated_template.fromName.replaceAll(
    //   key,
    //   dynamic_fields[String(key)],
    // );
    updated_template.body = updated_template.body.replaceAll(
      key,
      dynamic_fields[String(key)],
    );
  }

  return updated_template;
};
export type EmailTempPath =
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'cancel_interview_session'
  | 'confirmation_mail_to_organizer'
  | 'application_received'
  | 'candidate_availability_request'
  | 'candidate_cancle_request'
  | 'candidate_reschedule_request'
  | 'init_email_agent'
  | 'interview_resend'
  | 'interview'
  | 'phone_screening'
  | 'phone_screening_resend'
  | 'recruiter_rescheduling_email'
  | 'rejection'
  | 'request_candidate_slot';

export type EmailDynamicParams<T extends EmailTempPath> = {
  confirmation_mail_to_organizer: {
    '[recruiterName]': string;
    '[firstName]': string;
    '[meetingLink]': string;
  };
  candidate_invite_confirmation: {
    '[firstName]': string;
    '[viewDetailsLink]': string;
    '[companyName]': string;
    '[jobTitle]': string;
  };
  debrief_calendar_invite: {
    '[teamMemberName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
  };
  cancel_interview_session: {
    '[companyName]': string;
    '[firstName]': string;
    '[sessionName]': string;
    '[jobTitle]': string;
  };
  application_received: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[supportLink]': string;
  };
  candidate_availability_request: {
    '[companyName]': string;
    '[firstName]': string;
    '[scheduleName]': string;
  };
  candidate_cancle_request: {
    '[recruiterName]': string;
    '[firstName]': string;
    '[rescheduleReason]': string;
    '[additionalRescheduleNotes]': string;
  };
  candidate_reschedule_request: {
    '[recruiterName]': string;
    '[firstName]': string;
    '[dateRange]': string;
    '[rescheduleReason]': string;
    '[additionalRescheduleNotes]': string;
  };
  init_email_agent: {
    '[companyName]': string;
    '[candidateFirstName]': string;
    '[jobRole]': string;
    '[companyTimeZone]': string;
    '[startDate]': string;
    '[endDate]': string;
    '[selfScheduleLink]': string;
  };
  interview_resend: {
    '[jobTitle]': string;
    '[companyName]': string;
    '[firstName]': string;
    '[interviewLink]': string;
    '[supportLink]': string;
  };
  interview: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
    '[interviewLink]': string;
    '[supportLink]': string;
  };
  phone_screening: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[phoneScreeningLink]': string;
  };
  phone_screening_resend: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[phoneScreeningLink]': string;
  };
  recruiter_rescheduling_email: {
    '[jobTitle]': string;
    '[firstName]': string;
    '[recruiterRescheduleReason]': string;
    '[scheduleName]': string;
    '[pickYourSlotLink]': string;
    '[companyName]': string;
  };
  rejection: {
    '[companyName]': string;
    '[firstName]': string;
    '[jobTitle]': string;
  };
  request_candidate_slot: {
    '[jobTitle]': string;
    '[firstName]': string;
    '[availabilityLink]': string;
    '[companyName]': string;
  };
}[T];

export type api_payload = {
  confirmation_mail_to_organizer: {
    recipient_email: string;
    mail_type: string;
    recruiter_id: string;
    payload: {};
  };
};
