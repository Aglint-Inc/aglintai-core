import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { ZOOM_REDIRECT_URI } from '@/src/utils/integrations/constants';
import { encrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type BodyParams = {
  code: string;
  recruiter_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id, code } = req.body as BodyParams;
    const authHeader = `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
    ).toString('base64')}`;
    const { data } = await axios.post(
      'https://zoom.us/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: ZOOM_REDIRECT_URI,
      },
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .update({
          zoom_auth: encrypt_string(JSON.stringify(data)),
        })
        .eq('id', recruiter_id),
    );
    return res.status(200).json('ok');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
