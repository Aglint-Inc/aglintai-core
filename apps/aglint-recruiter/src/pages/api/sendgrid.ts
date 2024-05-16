/* eslint-disable no-console */

import { APISendgridPayload } from '@aglint/shared-types';

import { getOutboundEmail } from '@/src/utils/scheduling_v2/get-outbound-email';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  let details = req.body as APISendgridPayload;

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
