import type {
  DatabaseEnums,
  EmailTemplateAPi,
  MailAttachment,
  SupabaseType,
  TargetApiPayloadType,
} from '@aglint/shared-types';

export interface FetchUtilResp<T extends DatabaseEnums['email_slack_types']> {
  company_id: string;
  job_id?: string;
  comp_email_placeholder: EmailTemplateAPi<T>['comp_email_placeholders'];
  react_email_placeholders: EmailTemplateAPi<T>['react_email_placeholders'];
  recipient_email: string;
  mail_attachments?: MailAttachment[];
}

export type FetchUtilType<T extends DatabaseEnums['email_slack_types']> = (
  supabaseAdmin: SupabaseType,
  req_body: TargetApiPayloadType<T>,
) => Promise<{
  mail_data: FetchUtilResp<T> | FetchUtilResp<T>[];
}>;
