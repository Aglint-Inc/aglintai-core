import sgMail from '@sendgrid/mail';
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface SendGridParams {
  to: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  text: string;
  html: string;
  sendAt?: number;
  fromName: string;
}

export const emailHandler = async ({
  options,
}: {
  options: Omit<SendGridParams, 'from'>;
}) => {
  const msg: SendGridParams = {
    from: {
      email: 'admin@aglinthq.com',
      name: options.fromName,
    },
    ...options,
  };
  const resp = await sgMail.send(msg);
  return resp;
};
