/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiBodyParamsCancelSchedule {
  meeting_id: string;
  session_id: string;
  reason: string;
  notes: string;
  cancel_user_id: string;
}

export type ApiResponseCancelSchedule = 'cancelled';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { meeting_id, session_id, reason, notes, cancel_user_id } =
      req.body as ApiBodyParamsCancelSchedule;

    console.log();

    if (!(meeting_id && session_id && reason && cancel_user_id)) {
      return res.status(400).send('Missing required fields');
    }

    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name];
          },
          set(name: string, value: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, value, options));
          },
          remove(name: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, '', options));
          },
        },
      },
    );

    if (meeting_id && session_id) {
      const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
        .from('interview_filter_json')
        .select('*')
        .contains('session_ids', [session_id]);

      if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

      if (checkFilterJson.length > 0) {
        const updateDbArray = checkFilterJson.map((filterJson) => ({
          ...filterJson,
          session_ids: filterJson.session_ids.filter((id) => id !== session_id),
        }));

        const { error: errFilterJson } = await supabase
          .from('interview_filter_json')
          .upsert(updateDbArray);

        if (errFilterJson) throw new Error(errFilterJson.message);
      }

      const { data, error: errMeet } = await supabase
        .from('interview_meeting')
        .update({
          status: 'cancelled',
        })
        .eq('id', meeting_id)
        .select();
      if (errMeet) {
        throw new Error(errMeet.message);
      }

      const { error } = await supabase.from('interview_session_cancel').insert({
        reason,
        type: 'declined',
        session_id,
        other_details: {
          dateRange: null,
          note: notes,
        },
        cancel_user_id: cancel_user_id,
      });

      if (error) throw new Error(error.message);

      if (data[0].meeting_json)
        axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v2/cancel_calender_event`,
          {
            calender_event: data[0].meeting_json,
          },
        );

      return res.status(200).send('cancelled');
    }
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
