/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/candidatedb/save-cron`;

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

    if (applications.length === 0) {
      console.log('no applications');
      return res.status(200).send('no applications');
    }

    if (applications?.length > 0) {
      await Promise.all(
        applications.map(async (application) => {
          try {
            await axios.post(`${url}`, {
              ...application,
            });
            console.log(
              'Request successful for candidate:',
              application.ag_candidate.id,
            );
          } catch (error) {
            console.error(
              'Error for application:',
              application.ag_candidate.id,
              error.message,
            );
            // You might want to handle errors here
          }
        }),
      );
      return res.status(200).send('success');
    } else {
      console.log('no applications');
      return res.status(200).send('no applications');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
