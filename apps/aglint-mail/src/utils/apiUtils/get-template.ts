import React from 'react';
import { supabaseAdmin, supabaseWrap } from '../../supabase/supabaseAdmin';

export type EmailTemplateFields = {
  body: string;
};

export type DbFetchedTypes = {
  body: string;
  default: boolean;
  subject: string;
  fromName: string;
};
const fetchTemplate = async (recruiter_id: string) => {
  const [templates] = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id),
  );
  const data = fillEmail(
    {
      '[companyName]': 'aglint',
      '[firstName]': 'chandan',
      '[scheduleName]': 'Python Interview',
    },
    templates,
  );

  return data.body;
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
    //   updated_template.fromName = updated_template.fromName.replaceAll(
    //     key,
    //     dynamic_fields[String(key)],
    //   );
    updated_template.body = updated_template.body.replaceAll(
      key,
      dynamic_fields[String(key)],
    );
  }
  return updated_template;
};
export type EmailTempPath =
  | 'candidate_availability_request'
  | 'aglint_mail'
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'cancel_interview_session'
  | 'init_email_agent'
  | 'confirmation_mail_to_organizer'
  | 'candidate_reschedule_request'
  | 'candidate_cancel_request'
  | 'recruiter_rescheduling_email';

export type EmailDynamicParams<T extends EmailTempPath> = {
  aglint_mail: {
    '[companyName]': string;
    '[firstName]': string;
    '[scheduleName]': string;
  };
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
