import {
  DatabaseEnums,
  EmailTemplateAPi,
  SupabaseType,
  TargetApiPayloadType,
} from '@aglint/shared-types';

export type FetchUtilType<T extends DatabaseEnums['email_slack_types']> = (
  supabaseAdmin: SupabaseType,
  req_body: TargetApiPayloadType<'applicantReject_email_applicant'>,
) => Promise<{
  company_id: string;
  job_id: string;
  comp_email_placeholder: EmailTemplateAPi<T>['comp_email_placeholders'];
  react_email_placeholders: EmailTemplateAPi<T>['react_email_placeholders'];
  recipient_email: string;
}>;
