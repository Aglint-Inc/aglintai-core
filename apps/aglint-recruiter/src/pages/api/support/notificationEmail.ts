import {
  type getNotificationMailBodyType,
  type NotificationsEmailAPIType,
  type Support_ticketType,
} from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { supabase } from '@/src/utils/supabase/client';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { application_id, details } =
      req.body as unknown as NotificationsEmailAPIType;
    if (!application_id && !details) {
      return res
        .status(400)
        .send({ message: 'Invalid request. Required props missing.' });
    }
    const ticketDetails = await getSupportTicket(application_id);
    if (ticketDetails.email_updates) {
      const { sent, error } = await sendMail({
        details,
        ticketDetails,
      });
      return res.status(200).send({ emailSend: sent, error: error });
    } else {
      return res
        .status(200)
        .send({ emailSend: false, error: 'Email update disabled by user!' });
    }
  }
  res.setHeader('Allow', 'POST');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
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
  details,
  ticketDetails,
}: getNotificationMailBodyType & {
  ticketDetails: Support_ticketType;
}): Promise<{
  sent: false;
  error: any;
}> => {
  //   if (email_type === 'message' && details.link) {
  //     details.temples = {
  //       subject: `${ticketDetails.id}: New Message `,
  //       body: `${details.temples.body}`,
  //     };
  //   } else if (email_type === 'update' && details.link) {
  //     details.temples = {
  //       subject: `${ticketDetails.id}: Status updated`,
  //       body: `${details.temples.body}`,
  //     };
  //   }
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
