import sgMail from '@sendgrid/mail';
import { MailSenderError } from '../utils/apiUtils/customErrors';
import { getOutboundEmail } from './get-outbound-email';
import { APISendgridPayload } from '@aglint/shared-types';

const SENDGRID_API_KEY =
  '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';
sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendMail(data: APISendgridPayload) {
  let {
    email,
    fromEmail,
    fromName,
    headers,
    subject,
    text,
    attachments,
    html,
  } = data as APISendgridPayload;
  try {
    const msg: any = {
      to: email, // Change to your recipient
      from: {
        email: fromEmail ?? 'admin@aglinthq.com',
        name: fromName ?? 'Aglint Admin',
      }, // Change to your verified sender
      subject: subject,
      html: html,
      text: text,
      headers: headers,
      attachments: attachments,
    };
    msg.to = await getOutboundEmail(msg.to);
    const resp = await sgMail.send(msg);
    const Response = resp[0];

    if (Response.statusCode >= 200 && Response.statusCode < 300) {
      return 'ok';
    }
    throw new MailSenderError(`mail failed to send`);
  } catch (error) {
    console.error(error.response.body);
    throw new MailSenderError(`mail failed to send`);
  }
}
