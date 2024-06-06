import sgMail from '@sendgrid/mail';
import { MailSenderError } from '../utils/apiUtils/customErrors';
import { getOutboundEmail } from './get-outbound-email';

const SENDGRID_API_KEY =
  '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';
sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendMail(data) {
  console.log('data', data.email);

  try {
    const msg: any = {
      to: data.email, // Change to your recipient
      from: {
        email: 'admin@aglinthq.com',
        name: 'Aglint Admin',
      }, // Change to your verified sender
      subject: data.subject,
      html: data.html,
    };

    console.log(msg.to);
    msg.to = await getOutboundEmail(msg.to);
    console.log(msg.to);
    try {
      const resp = await sgMail.send(msg);
      const Response = resp[0];

      if (Response.statusCode >= 200 && Response.statusCode < 300) {
        return 'ok';
      }
      throw new MailSenderError(`mail failed to send`);
    } catch (e: any) {
      console.log(e);
      throw new MailSenderError(e.message);
    }
  } catch (error) {
    console.log('error1', error);
    console.log('error2', error.response.body);

    throw new MailSenderError(`mail failed to send`);
  }
}
