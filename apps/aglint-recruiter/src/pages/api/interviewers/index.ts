import { CalendarEvent } from '@aglint/shared-types';
import { CustomSchedulingSettings } from '@aglint/shared-types/src/db/tables/common.types';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { getCalEventType } from '@/src/services/CandidateScheduleV2/utils/fetchIntsCalEventsDetails';
import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

type user = {
  user_id: string;
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  profile_image: string;
};

export type initUser = {
  isCalenderConnected: boolean;
  all_events: (CalendarEvent & { type: string })[];
} & user;

const payload_schema = v.object({
  recruiter_id: v.string(),
  startDate: v.string(),
  endDate: v.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { recruiter_id, startDate, endDate } = v.parse(
      payload_schema,
      req.body,
    );

    const { data: users, error } = await supabaseAdmin
      .from('all_interviewers')
      .select('user_id,first_name,last_name,position,email,profile_image')
      .eq('recruiter_id', recruiter_id);

    const {
      data: { scheduling_settings },
    } = await supabaseAdmin
      .from('recruiter')
      .select('scheduling_settings')
      .eq('id', recruiter_id)
      .single()
      .throwOnError();

    if (error) throw new Error(error.message);

    const promise = users.map((user) =>
      fetchIntsCalEvents(user, scheduling_settings, startDate, endDate),
    );

    const ints_events: initUser[] = await Promise.all(promise);

    return res.json({ data: ints_events, message: 'ok', success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}

const fetchIntsCalEvents = async (
  user: user,
  scheduling_setting: CustomSchedulingSettings,
  startDate: string,
  endDate: string,
) => {
  const updated_user_details: initUser = {
    ...user,
    all_events: [],
    isCalenderConnected: false,
  };

  try {
    const google_cal = new GoogleCalender(null, null, user.user_id);
    await google_cal.authorizeUser();
    const fetched_events = await google_cal.getAllCalenderEvents(
      startDate,
      endDate,
    );

    const fetched_events_with_type = fetched_events.map((fetched_event) => ({
      ...fetched_event,
      type: getCalEventType(fetched_event.summary, scheduling_setting),
    })) as initUser['all_events'];

    updated_user_details.isCalenderConnected = true;
    updated_user_details.all_events = fetched_events_with_type;
    updated_user_details.first_name = user.first_name;
    updated_user_details.last_name = user.last_name;
    updated_user_details.email = user.email;
    updated_user_details.position = user.position;
    updated_user_details.user_id = user.user_id;
    updated_user_details.profile_image = user.profile_image;
  } catch (error) {
    updated_user_details.isCalenderConnected = false;
  }

  return updated_user_details;
};
