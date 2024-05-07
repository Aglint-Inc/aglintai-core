/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import { capitalize } from '@/src/components/JobApplicationsDashboard/utils';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { JobApplicationEmails } from '../job/jobApplications/candidateEmail';
import { sendMails } from '../job/jobApplications/candidateEmail/utils';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

type BodyParams = {
  job: JobApplicationEmails['request']['job'];
  purposes: JobApplicationEmails['request']['purposes'];
  applicationIds: string[];
  candidates: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name];
          },
        },
      },
    );
    const { job, purposes, applicationIds, candidates } =
      req.body as BodyParams;

    const errorMessages = purposes.reduce((acc, curr) => {
      if (!job?.email_template[curr])
        acc.push(
          `Missing email template for ${capitalize(curr).replace(
            'resend',
            'follow up',
          )}`,
        );
      return acc;
    }, []);
    if (errorMessages.length !== 0) {
      res.status(200).json({ confrmation: false, error: errorMessages });
      return;
    }

    if (applicationIds && applicationIds.length !== 0) {
      try {
        sendMails(supabase, job, purposes, candidates, sgMail);
        updateDataInDb(candidates);
      } catch (e) {
        //do nothing
      }
    }

    return;
  } catch (e) {
    res.status(200).json({ confirmation: false, error: e.message });
    return;
  }
};

export default handler;

const updateDataInDb = async (candidates: { application_id: string }[]) => {
  const timeStamp = new Date().toISOString();
  const [app] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('status_emails_sent')
      .eq('id', candidates[0].application_id),
  ) as unknown as JobApplication[];
  if (app.status_emails_sent) {
    if (app.status_emails_sent.phone_screening) {
      app.status_emails_sent.phone_screening_resend = timeStamp;

      supabaseWrap(
        await supabaseAdmin
          .from('applications')
          .update({ status_emails_sent: app.status_emails_sent })
          .eq('id', candidates[0].application_id),
      );
    } else if (app.status_emails_sent.phone_screening_resend) {
      app.status_emails_sent.phone_screening_resend = timeStamp;
      supabaseWrap(
        await supabaseAdmin
          .from('applications')
          .update({
            status_emails_sent: app.status_emails_sent.phone_screening_resend,
          })
          .eq('id', candidates[0].application_id),
      );
    } else {
      app.status_emails_sent.phone_screening = timeStamp;

      supabaseWrap(
        await supabaseAdmin
          .from('applications')
          .update({ status_emails_sent: app.status_emails_sent })
          .eq('id', candidates[0].application_id),
      );
    }
  }
};
