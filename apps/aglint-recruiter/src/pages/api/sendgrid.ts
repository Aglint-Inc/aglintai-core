/* eslint-disable no-console */

import { type APISendgridPayload } from '@aglint/shared-types';

import { getOutboundEmail } from '@/src/utils/scheduling_v2/get-outbound-email';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  let { email, fromEmail, fromName, headers, subject, text, attachments } =
    req.body as APISendgridPayload;

  try {
    const msg: any = {
      to: email, // Change to your recipient
      from: {
        email: fromEmail ?? 'admin@aglinthq.com',
        name: fromName ?? 'Aglint Admin',
      }, // Change to your verified sender
      subject: subject,
      html: text,
      headers: headers,
      attachments: attachments,
    };

    console.log(msg.to);
    msg.to = await getOutboundEmail(msg.to);
    console.log(msg.to);
    await sgMail.send({
      ...msg,
    });
    return res.status(200).json({ data: 'Email sent' });
  } catch (error) {
    return res.status(200).json({ data: { error: error.message } });
  }
}
