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

export const sendMailFun = async <
  T extends DatabaseEnums['email_slack_types'],
>({
  filled_comp_template,
  react_email_placeholders,
  recipient_email,
  attachments,
  is_preview,
}: {
  filled_comp_template:
    | DatabaseTable['job_email_template']
    | DatabaseTable['company_email_template'];
  react_email_placeholders: EmailTemplateAPi<T>['react_email_placeholders'];
  recipient_email: string;
  is_preview?: boolean;
  attachments?: ICSAttachment[];
}) => {
  const { emails } = await getEmails();
  const emailIdx = emails.findIndex((e) => e === filled_comp_template.type);
  if (emailIdx === -1)
    throw new ClientError(
      `${filled_comp_template.type} does not match any mail_type`,
      400,
    );
  const { html, subject } = await renderEmailTemplate<T>(
    filled_comp_template.type as T,
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
