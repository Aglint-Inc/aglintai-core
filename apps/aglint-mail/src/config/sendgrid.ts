/* eslint-disable no-console */
import sgMail from '@sendgrid/mail';
import type { APISendgridPayload } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import { MailSenderError } from '../utils/apiUtils/customErrors';
import { getOutboundEmail } from './get-outbound-email';

export default async function sendMail(data: APISendgridPayload) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(SENDGRID_API_KEY);
  const {
    email,
    fromEmail,
    fromName,
    headers,
    subject,
    text,
    attachments,
    html,
  } = data;
  try {
    if (subject.length === 0 && text.length === 0 && html.length === 0) {
      throw new CApiError(
        'SERVER_ERROR',
        'Email must have a subject, text or html',
      );
    }
    const msg: any = {
      to: email, // Change to your recipient
      from: {
        email: fromEmail ?? 'admin@aglinthq.com',
        name: fromName ?? 'Aglint Admin',
      }, // Change to your verified sender
      subject,
      html,
      text,
      headers,
      attachments,
    };

    if (Array.isArray(msg.to)) {
      const updated_emails: string[] = msg.to;

      const email_promises = updated_emails.map(async (to_email) => {
        return getOutboundEmail(to_email);
      });

      msg.to = await Promise.all(email_promises);
    } else {
      msg.to = await getOutboundEmail(msg.to);
    }
    const resp = await sgMail.send(msg);
    const Response = resp[0];

    console.log(msg.to);
    if (Response.statusCode >= 200 && Response.statusCode < 300) {
      return 'ok';
    }
    throw new MailSenderError(`mail failed to send`);
  } catch (error) {
    console.error(error?.response?.body);
    throw new MailSenderError(`mail failed to send`);
  }
}
