import type {
  DatabaseEnums,
  DatabaseTable,
  EmailTemplateAPi,
} from '@aglint/shared-types';
import sendMail from '../../config/sendgrid';
import type { ICSAttachment } from '../ceateIcsContent';
import { ClientError } from './customErrors';
import { getEmails } from './get-emails';
import { renderEmailTemplate } from './renderEmailTemplate';
import { MailPayloadType } from '../../types/app.types';

export const sendMailFun = async <
  T extends DatabaseEnums['email_slack_types'],
>({
  filled_comp_template,
  react_email_placeholders,
  recipient_email,
  attachments,
  is_preview,
  api_target,
}: {
  filled_comp_template: MailPayloadType;
  react_email_placeholders: EmailTemplateAPi<T>['react_email_placeholders'];
  recipient_email: string;
  api_target: DatabaseEnums['email_slack_types'];
  is_preview?: boolean;
  attachments?: ICSAttachment[];
}) => {
  const { emails } = await getEmails();
  const emailIdx = emails.findIndex((e) => e === api_target);
  if (emailIdx === -1)
    throw new ClientError(`${api_target} does not match any mail_type`, 400);
  const { html, subject } = await renderEmailTemplate<T>(
    api_target as T,
    react_email_placeholders,
  );
  if (is_preview) {
    return { html, subject };
  }
  await sendMail({
    email: recipient_email,
    html,
    subject,
    text: html,
    fromName: filled_comp_template.from_name,
    attachments,
  });
  return null;
};
