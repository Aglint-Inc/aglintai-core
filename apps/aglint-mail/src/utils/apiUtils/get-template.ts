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
  | 'confirmation_mail_to_organizer';
// | 'candidate_availability_request'
// | 'init_email_agent'
// | 'candidate_reschedule_request'
// | 'candidate_cancel_request'
// | 'recruiter_rescheduling_email';

export type EmailDynamicParams<T extends EmailTempPath> = {
  // init_email_agent: {
  //   '[candidateFirstName]': string;
  //   '[companyName]': string;
  //   '[jobRole]': string;
  //   '[endDate]': string;
  //   '[startDate]': string;
  //   '[companyTimeZone]': string;
  //   '[candidateTimeZone]': string;
  //   '[selfScheduleLink]': string;
  // };
  confirmation_mail_to_organizer: {
    '[recruiterName]': string;
    '[firstName]': string;
    '[meetingLink]': string;
  };
  // candidate_reschedule_request: never;
  // candidate_cancel_request: never;
  // recruiter_rescheduling_email: never;
  // candidate_availability_request: never;
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
}[T];
