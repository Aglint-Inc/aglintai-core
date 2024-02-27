import { createClient } from '@supabase/supabase-js';
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { panel_name, panel_id, selected_time_slots, time_slot_duration } =
    req.body as BodyParams;

  if (!panel_name || !time_slot_duration || !selected_time_slots)
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
    return res.status(200).send('mail sent');
  } catch (error) {
    res.status(400).send(error.message);
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
