/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

interface EmailAuth {
  exp: string;
  email: string;
  provider: string;
  expiry_date: number;
  access_token: string;
  refresh_token: string;
}

interface RecruiterUser {
  user_id: string;
  email_auth: EmailAuth;
}

interface OutreachEmail {
  id: number;
  email: {
    body: string;
    subject: string;
    toEmail: string;
    createdAt: string;
    fromEmail: string;
  };
  email_sent: boolean;
  candidate_id: string;
  recruiter_user_id: string;
}

interface AgCandidate {
  id: string;
  email: string;
  aglint_id: string;
  organization_id: string;
}

interface FullObject {
  ag_candidate: AgCandidate;
  outreach_email: OutreachEmail;
  recruiter_user: RecruiterUser;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let applications: FullObject[] = req.body;
    console.log(applications.length, 'applications');

    await Promise.all(
      applications.map(async (application) => {
        if (application.outreach_email.email.toEmail) {
          //sending email api
          const resEmail = await axios.post(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/api/email-outreach/send-email`,
            {
              fromEmail: application.outreach_email.email.fromEmail,
              toEmail: application.outreach_email.email.toEmail,
              access_token: application.recruiter_user.email_auth.access_token,
              refresh_token:
                application.recruiter_user.email_auth.refresh_token,
              subject: application.outreach_email.email.subject,
              body: application.outreach_email.email.body,
            },
          );

          if (resEmail.status !== 200) {
            console.log('error in sending email');
          }
          console.log(
            'email sent to ' + application.outreach_email.email.toEmail,
          );
          //sending email api

          //saving outreached_emails and making email_sent true
          const { error: errorOe } = await supabase
            .from('outreached_emails')
            .update({
              email_sent: true,
            })
            .eq('id', application.outreach_email.id)
            .select();

          if (errorOe) {
            console.log('error in saving outreached_emails');
          }
        } else {
          console.log('no email');
        }
      }),
    );
    return res.status(200).send('done sending emails');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
