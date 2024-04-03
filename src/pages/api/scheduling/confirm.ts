/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      candidate_email,
      rec_id,
      id,
      schedule_name,
      selectedSlot,
      candidate_name,
      position,
    } = req.body;

    axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v2/book_schedule_plan`,
      {
        plan: { plans: selectedSlot.plans },
        candidate_email: candidate_email,
        schedule_id: id,
      },
    );

    await mailThankYouHandler({
      rec_id,
      position,
      schedule_name,
      schedule_id: id,
      mail: candidate_email,
      candidate_name,
    });
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;

export const mailThankYouHandler = async ({
  rec_id,
  schedule_name,
  schedule_id,
  candidate_name,
  mail,
  position,
}: {
  rec_id: string;
  schedule_name: string;
  schedule_id: string;
  candidate_name: string;
  mail: string;
  position: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('recruiter')
      .select('name, email_template')
      .eq('id', rec_id);
    if (error) throw new Error(error.message);
    if (data[0].email_template['candidate_invite_confirmation'])
      await axios
        .post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
          fromEmail: `messenger@aglinthq.com`,
          fromName: 'Aglint',
          email: 'admin@aglinthq.com' ?? mail,
          subject: fillEmailTemplate(
            data[0].email_template['candidate_invite_confirmation'].subject,
            {
              company_name: data[0].name,
              schedule_name: schedule_name,
              first_name: candidate_name,
              last_name: '',
              job_title: position,
            },
          ),
          text: fillEmailTemplate(
            data[0].email_template['candidate_invite_confirmation'].body,
            {
              company_name: data[0].name,
              schedule_name: schedule_name,
              first_name: candidate_name,
              last_name: '',
              job_title: position,
              view_details: `<a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}'>View Details</a>`,
            },
          ),
        })
        .then((res) => {
          if (res.status === 200 && res.data.data === 'Email sent') {
            return true;
          } else {
            console.log(
              'error',
              'Unable to send the mail. Please try again later.',
            );
            return false;
          }
        });
  } catch (e) {
    console.log('error', e);
  }
};
