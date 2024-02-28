import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import {
  InterviewerType,
  ServerInterviewerAvailabliity,
} from '@/src/components/Scheduling/Availability/availability.types';
import {
  InterviewPanelRelationType,
  InterviewPanelType,
} from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

type BodyParams = {
  panel_name: string;
  panel_id: string;
  selected_time_slots: string[];
  time_slot_duration: string;
  req_user_id: string;
  chat_id: string;
  logo_url?: string;
  recruiter_name: string;
  date_range: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let {
    panel_name,
    panel_id,
    selected_time_slots,
    time_slot_duration,
    req_user_id,
    chat_id,
    logo_url,
    recruiter_name,
    date_range,
  } = req.body as BodyParams;

  if (
    !panel_name ||
    !time_slot_duration ||
    !selected_time_slots ||
    !req_user_id ||
    !date_range
  )
    return res.status(400).send('missing required fields');
  try {
    if (panel_name) {
      const [panel] = supabaseWrap(
        await supabaseAdmin
          .from('interview_panel')
          .select()
          .eq('name', panel_name),
      ) as InterviewPanelType[];
      if (!panel) res.status(404).send('');
      panel_id = panel.id;
    }
    const av = await fetch_saved_ints(panel_id);
    let updated_av = cloneDeep(av);

    for (let sel_slot of selected_time_slots) {
      for (let inter of updated_av) {
        for (let time_slot_avail of inter.slots) {
          if (time_slot_avail.timeDuration !== Number(time_slot_duration))
            continue;
          const [start_time, end_time] = sel_slot.split('_');
          let date_key = dayjs(start_time).format('YYYY-MM-DD');
          if (!Object.hasOwn(time_slot_avail.availability, date_key)) {
            time_slot_avail.availability[String(date_key)] = [];
          }
          time_slot_avail.availability[String(date_key)].push({
            status: 'requested',
            startTime: dayjs(start_time).toISOString(),
            endTime: dayjs(end_time).toISOString(),
          });
        }
      }
    }
    await save_slots_send_mail(updated_av);
    await sendMail({
      panel_id,
      user_ids: av.map((i) => i.interviewerId),
      time_slot_duration,
      req_user_id,
      chat_id,
      logo_url,
      recruiter_name,
      date_range,
    });
    return res.status(200).send('mail sent');
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default handler;

type Fetch_saved_ints_return_params = Pick<InterviewerType, 'interviewerId'> & {
  slots: ServerInterviewerAvailabliity[];
};
const fetch_saved_ints = async (panel_id) => {
  const ints = supabaseWrap(
    await supabaseAdmin
      .from('interview_panel_relation')
      .select()
      .eq('panel_id', panel_id),
  ) as InterviewPanelRelationType[];
  const int_ids = ints.map((int) => int.user_id);
  const savedIntsPromises = int_ids.map(async (int_id) => {
    const [saved] = supabaseWrap(
      await supabaseAdmin
        .from('interview_availabilties')
        .select('slot_availability')
        .eq('user_id', int_id),
    );
    const intS: Fetch_saved_ints_return_params = {
      slots: (saved.slot_availability ?? []) as ServerInterviewerAvailabliity[],
      interviewerId: int_id,
    };
    return intS;
  });
  let intSavedSlots = await Promise.all(savedIntsPromises);
  return intSavedSlots;
};

const save_slots_send_mail = async (ints: Fetch_saved_ints_return_params[]) => {
  const promises = ints.map(async (i) => {
    supabaseWrap(
      await supabaseAdmin
        .from('interview_availabilties')
        .update({ slot_availability: i.slots })
        .eq('user_id', i.interviewerId),
    );
  });
  await Promise.all(promises);
  // send mail
};

const sendMail = async ({
  panel_id,
  user_ids,
  time_slot_duration,
  req_user_id,
  chat_id,
  logo_url,
  recruiter_name,
  date_range,
}) => {
  try {
    const promises = user_ids.map(async (i) => {
      const [s] = supabaseWrap(
        await supabaseAdmin
          .from('recruiter_user')
          .select('email')
          .eq('user_id', i),
      );
      const link = `${process.env.NEXT_PUBLIC_HOST_NAME}/confirm-availability/${panel_id}?user_id=${i}&req_user_id=${req_user_id}&time_duration=${time_slot_duration}&chat_id=${chat_id}`;

      await axios.post(
        `https://us-central1-aglint-cloud-381414.cloudfunctions.net/mails-sender`,
        {
          mail_type: 'interviewer-confirm-availability',
          recipient_email: s.email,
          payload: {
            recruiter_name: recruiter_name,
            logoUrl:
              logo_url ??
              'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png?t=2024-01-24T13%3A11%3A17.382Z',

            link: link,
            fromDate: dayjs(date_range.start).format('DD MMM'),
            endDate: dayjs(date_range.end).format('DD MMM'),
          },
        },
      );
    });
    await Promise.all(promises);
  } catch (err) {
    //
  }
};
