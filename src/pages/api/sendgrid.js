// import { isEnvProd } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

import { isEnvProd } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
isEnvProd()
export default async function handler(req, res) {
  let details = req.body;

  try {
    const msg = {
      to: details.email, // Change to your recipient
      from: {
        email: details.fromEmail ?? 'admin@aglinthq.com',
        name: details.fromName ?? 'Aglint Admin',
      }, // Change to your verified sender
      subject: details.subject,
      html: details.text,
    };
    if (!isEnvProd()) {
      msg.to = ['dileep@aglinthq.com', 'chinmai@aglinthq.com', 'dileepwert@gmail.com'];
    }

    await sgMail.send({
      ...msg,
    })
    return res.status(200).send("ok")
  } catch (error) {
    return res.status(500).send(error.message);
  }

}
