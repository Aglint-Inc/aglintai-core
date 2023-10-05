import { NextApiRequest, NextApiResponse } from 'next';

import {
  getMailBodyType,
  Support_ticketType,
  SupportEmailAPIType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { application_id, email_type, details } =
      req.body as unknown as SupportEmailAPIType;
    if (!application_id && !email_type) {
      return res
        .status(400)
        .send({ message: 'Invalid request. Required props missing.' });
    }
    const ticketDetails = await getSupportTicket(application_id);
    // if (ticketDetails.email_updates) {
    const { sent, error } = await sendMail({
      email_type,
      details,
      ticketDetails,
    });
    return res.status(200).send({ emailSend: sent, error: error });
    // } else {
    //   return res
    //     .status(200)
    //     .send({ emailSend: false, error: 'Email update disabled by user!' });
    // }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}

const getSupportTicket = async (applications_id: string) => {
  const { data, error } = await supabase
    .from('support_ticket')
    .select()
    .eq('application_id', applications_id);
  if (!error && data.length) {
    return data[0];
  }
  return null;
};

const sendMail = ({
  email_type,
  details,
  ticketDetails,
}: getMailBodyType & { ticketDetails: Support_ticketType }): Promise<{
  sent: false;
  error: any;
}> => {
  if (email_type === 'interviewLink' && details.link) {
    details.temples = {
      subject: 'Interview Link',
      body: `Use this link to give your interview: ${details.link}`,
    };
  }
  const msg = {
    to: ticketDetails.email,
    from: {
      email: details.fromEmail || 'admin@aglinthq.com',
      name: details.fromName || 'Aglint Admin',
    }, // Change to your verified sender
    subject: details.temples.subject,
    html: details.temples.body,
  };
  return sgMail
    .send(msg)
    .then(() => ({ sent: true, error: null }))
    .catch((error) => ({ sent: false, error: error }));
};
