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
    let application: FullObject = req.body;

    if (!application.ag_candidate.id) {
      console.log('no ag candidate id');
      return res.status(200).send('no ag candidate id');
    }

    if (!application.outreach_email.id) {
      console.log('no outreach email id');
      return res.status(200).send('no outreach email id');
    }

    if (!application.recruiter_user.user_id) {
      console.log('no recruiter user id');
      return res.status(200).send('no recruiter user id');
    }

    if (!application) {
      console.log('no application');
      return res.status(200).send('no application');
    }

    if (application) {
      const apiUrl = 'https://api.apollo.io/v1/people/match';

      const headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      };

      const response = await axios.post(
        apiUrl,
        { api_key: process.env.APPOLO_API, id: application.ag_candidate.id },
        { headers },
      );

      if (response.status !== 200) {
        console.log('error in apollo search');
        return res.status(200).send('error in apollo search');
      }

      const email = response.data.person?.email;

      if (!email) {
        await supabase
          .from('aglint_candidates')
          .update({ email_fetch_status: 'unable to fetch' })
          .eq('id', application.ag_candidate.id)
          .select();
        console.log('no email');
        return res.status(200).send('no email');
      }

      const { data: candidateAg, error: errorAg } = await supabase
        .from('aglint_candidates')
        .update({ email: email, email_fetch_status: 'success' })
        .eq('id', application.ag_candidate.id)
        .select();

      if (errorAg) {
        console.log(errorAg);
        return res.status(500).send(errorAg.message);
      }
      console.log(candidateAg[0].email, 'updated in db aglint candidate');

      //sending email api
      const resEmail = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/email-outreach/send-email`,
        {
          fromEmail: application.outreach_email.email.fromEmail,
          toEmail: email,
          access_token: application.recruiter_user.email_auth.access_token,
          refresh_token: application.recruiter_user.email_auth.refresh_token,
          subject: application.outreach_email.email.subject,
          body: application.outreach_email.email.body,
        },
      );

      if (resEmail.status !== 200) {
        console.log('error in sending email');
        return res.status(200).send('error in sending email');
      }
      console.log(resEmail.data, 'email sent');
      //sending email api

      //saving outreached_emails and making email_sent true
      const { data: outreachEm, error: errorOe } = await supabase
        .from('outreached_emails')
        .update({
          email: { ...application.outreach_email.email, toEmail: email },
          email_sent: true,
        })
        .eq('id', application.outreach_email.id)
        .select();

      if (errorOe) {
        console.log(errorOe);
        return res.status(500).send(errorOe.message);
      }

      console.log(
        (outreachEm[0] as OutreachEmail).email.toEmail,
        'updated in db outreach email',
      );

      return res.status(200).json(outreachEm[0]);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
