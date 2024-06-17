import sendMail from '../../config/sendgrid';
import { ClientError } from './customErrors';
import { getEmails } from './get-emails';
import { renderEmailTemplate } from './renderEmailTemplate';

export const sendMailFun = async (
  filled_comp_template,
  react_email_placeholders,
  recipient_email,
) => {
  const { emails } = await getEmails();
  const emailIdx = emails.findIndex((e) => e === filled_comp_template.type);

  if (emailIdx === -1)
    throw new ClientError(
      `${filled_comp_template.type} does not match any mail_type`,
      400,
    );

  const { html, subject } = await renderEmailTemplate(
    filled_comp_template.type,
    react_email_placeholders,
  );
  await sendMail({
    email: recipient_email,
    html,
    subject,
    text: html,
    fromName: filled_comp_template.from_name,
  });
};
