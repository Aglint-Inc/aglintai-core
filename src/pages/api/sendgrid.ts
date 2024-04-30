import { getOutboundEmail } from '@/src/utils/schedule-utils/get-outbound-email';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export type BodyParmsSendgrid = {
  fromEmail: string;
  fromName: string;
  subject: string;
  text: string;
  email: string;
  headers: Record<string, any>;
};

export default async function handler(req, res) {
  let details = req.body as BodyParmsSendgrid;

  try {
    const msg: any = {
      to: details.email, // Change to your recipient
      from: {
        email: details.fromEmail ?? 'admin@aglinthq.com',
        name: details.fromName ?? 'Aglint Admin',
      }, // Change to your verified sender
      subject: details.subject,
      html: details.text,
      headers: details.headers,
    };

    msg.to = getOutboundEmail(msg.to, true);

    const resEmail = await sgMail.send({
      ...msg,
    });
    // eslint-disable-next-line no-console
    console.log(resEmail);

    return res.status(200).json({ data: 'Email sent' });
  } catch (error) {
    return res.status(200).json({ data: { error: error.message } });
  }
}
