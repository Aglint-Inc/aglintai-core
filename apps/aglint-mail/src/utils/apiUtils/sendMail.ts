import type {
  DatabaseEnums,
  DatabaseTable,
  EmailTemplateAPi,
  SupabaseType,
} from '@aglint/shared-types';
import { fillCompEmailTemplate } from '@aglint/shared-utils';
import sendMail from '../../config/sendgrid';
import type { ICSAttachment } from '../ceateIcsContent';
import type { MailPayloadType } from '../../types/app.types';
import { ClientError } from './customErrors';
import { getEmails } from './get-emails';
import { renderEmailTemplate } from './renderEmailTemplate';
import { fetchCompEmailTemp, fetchJobEmailTemp } from './fetchCompEmailTemp';

export const sendMailFun = async <
  T extends DatabaseEnums['email_slack_types'],
>({
  comp_email_placeholder,
  react_email_placeholders,
  recipient_email,
  attachments,
  is_preview,
  api_target,
  company_id,
  job_id,
  payload,
  supabaseAdmin,
}: {
  react_email_placeholders: EmailTemplateAPi<T>['react_email_placeholders'];
  recipient_email: string;
  api_target: DatabaseEnums['email_slack_types'];
  company_id: string;
  is_preview?: boolean;
  attachments?: ICSAttachment[];
  job_id?: string;
  payload?: MailPayloadType;
  comp_email_placeholder: Record<string, string>;
  supabaseAdmin: SupabaseType;
}) => {
  console.log('newjknk');
  let fetched_temp: Pick<
    DatabaseTable['company_email_template'],
    'body' | 'from_name' | 'subject'
  >;
  if (job_id) {
    fetched_temp = await fetchJobEmailTemp(supabaseAdmin, job_id, api_target);
  } else {
    fetched_temp = await fetchCompEmailTemp(
      supabaseAdmin,
      company_id,
      api_target,
    );
  }
  console.log('newjknk');
  if (payload) {
    fetched_temp.subject = payload.subject;
    fetched_temp.body = payload.body;
  }
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    fetched_temp,
  );
  const { emails } = await getEmails();
  const emailIdx = emails.findIndex((e) => e === api_target);
  if (emailIdx === -1)
    throw new ClientError(`${api_target} does not match any mail_type`, 400);
  const { html } = await renderEmailTemplate<T>(api_target as T, {
    ...react_email_placeholders,
    subject: filled_comp_template.subject,
    emailBody: filled_comp_template.body,
  });
  if (is_preview) {
    return { html, subject: filled_comp_template.subject };
  }
  await sendMail({
    email: recipient_email,
    html,
    subject: filled_comp_template.subject,
    text: html,
    fromName: filled_comp_template.from_name,
    attachments,
  });
  return null;
};
