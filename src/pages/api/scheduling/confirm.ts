/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

type BodyParams = {
  id: string;
  selectedSlot: {
    startTime: string;
    endTime: string;
  };
  company_logo: string;
  company_name: string;
  schedule_name: string;
  interviewers_id: string[];
  candidate_email: string;
  organizer_id: String;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      // candidate_email,
      // company_logo,
      // company_name,
      id,
      // schedule_name,
      selectedSlot
    } = req.body as BodyParams;

    // const resp = await axios.post(
    //   `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/create-calender-event`,
    //   {
    //     start_time: selectedSlot.startTime,
    //     end_time: selectedSlot.endTime,
    //     interviewers_id: interviewers_id.filter(
    //       (int_id) => int_id !== organizer_id
    //     ),
    //     organizer_id: organizer_id,
    //     schedule_name: schedule_name,
    //     candidate_email: 'admin@aglinthq.com'
    //   }
    // );

    // if (resp.status !== 200) {
    //   return res.status(400).send('Error in scheduling');
    // }

    const { data, error } = await supabase
      .from('interview_schedule')
      .update({
        status: 'confirmed',
        confirmed_option: selectedSlot
      })
      .eq('id', id)
      .select();

    // await mailThankYouHandler({
    //   company_logo: company_logo,
    //   company_name: company_name,
    //   schedule_name: schedule_name,
    //   timings: `${dayjs(selectedSlot.startTime).format('hh:mm A')} - ${dayjs(selectedSlot.endTime).format('hh:mm A')}`
    // });

    if (error) {
      console.log('error', error.message);
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;

export const mailThankYouHandler = async ({
  company_name,
  company_logo,
  timings,
  schedule_name,
  mail
}: {
  company_name: string;
  company_logo: string;
  timings: string;
  schedule_name: string;
  mail?: string;
}) => {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
        fromEmail: `messenger@aglinthq.com`,
        fromName: 'Aglint',
        email: mail ? mail : 'admin@aglinthq.com',
        subject: `Confirmation: Interview Scheduled at ${company_name}`,
        text: `<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <img src="${company_logo}" alt="Company Logo" style="width: 60px; height:60px;border-radius:4px; margin-bottom: 20px;">
              <h1 style="font-size: 18px; color: #333333;">You have confirmed an interview at ${company_name}</h1>
              <p style="color: #68737D; font-size: 14px; margin-bottom: 30px;">You have confirmed your slot. Please make sure you are available at the selected time.</p>
              <div style="background-color: #f9f9f9; padding: 10px; margin-bottom: 20px;">
                  <h2 style="color: #333333; font-size: 16px; margin: 0;">${schedule_name}</h2>
                  <p style="margin: 5px 0 0px; color: #68737D; font-size: 12px;">30 Minutes <img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/company-logo/public/google-meet.png?t=2024-02-13T13%3A08%3A33.200Z" alt="Company Logo" style="height:12px; width:12px;"><span style="margin-left:10px">Google Meet</span></p>
                  <h1 style="font-size: 14px; color: #333333;">${timings}</h1>
              </div>
              <p style="color: #999999; font-size: 12px;"><span style="margin-bottom:4px;">Powered By</span> <span style="color: #e67e22; font-weight: bold;"><img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/assets/aglint_logo.png?t=2024-02-13T13%3A14%3A04.632Z" alt="Company Logo" style="height:12px; width:50px;"></span> <span style="margin-left:10px; margin-bottom:4px;">© 2023 Aglint Inc. All Rights Reserved.</span> </p>
          </div>
      </body>`
      })
      .then((res) => {
        if (res.status === 200 && res.data.data === 'Email sent') {
          return true;
        } else {
          console.log(
            'error',
            'Unable to send the mail. Please try again later.'
          );
          return false;
        }
      });
  } catch (e) {
    console.log('error', e);
  }
};
