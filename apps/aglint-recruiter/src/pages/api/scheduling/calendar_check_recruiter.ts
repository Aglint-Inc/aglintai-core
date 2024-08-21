import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const userCalendarCheck = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/check_calendar_status`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { recruiter_id } = req.body;

  if (!recruiter_id) {
    // eslint-disable-next-line no-console
    console.log('missing fields');
    return res.status(400).send('missing fields');
  }

  try {
    const { data: users, error } = await supabaseAdmin
      .from('recruiter_relation')
      .select('user_id')
      .eq('recruiter_id', recruiter_id);

    if (error) throw error;

    users.forEach((user) => {
      axios
        .post(userCalendarCheck, { user_id: user.user_id })
        .catch(console.error);
    });

    res.status(200).send('Requests sent'); // Sends response immediately after initiating requests
  } catch (error) {
    console.error(error?.message ? error.message : String(error));
    return res.status(500).send(String(error));
  }
};

export default handler;
