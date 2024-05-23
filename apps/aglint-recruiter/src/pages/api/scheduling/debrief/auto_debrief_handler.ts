/* eslint-disable no-console */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { ApiBodyParamTaskCreate } from './task_create';

const url1 = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/debrief/task_create`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('interview_schedule')
      .select('id,application_id,interview_meeting(id,interview_session(id))')
      .eq('interview_meeting.interview_session.session_type', 'debrief')
      .eq('interview_meeting.status', 'not_scheduled')
      .not('interview_meeting', 'is', null)
      .not('interview_meeting.interview_session', 'is', null)
      .limit(1);

    if (error) {
      throw new Error(error.message);
    } else {
      if (data?.length > 0) {
        await Promise.all(
          data.map(async (sch) => {
            const bodyParams: ApiBodyParamTaskCreate = {
              application_id: sch.application_id,
              schedule_id: sch.id,
            };
            try {
              axios.post(`${url1}`, bodyParams);
            } catch (error) {
              console.error('Error for schedule:', sch.id, error.message);
            }
          }),
        );
        return res.status(200).send(`${data.length} schedule triggered`);
      } else {
        console.log('no applications');
        return res.status(200).send('no applications');
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default handler;
