/* eslint-disable no-console */
import { RecruiterUserType } from '@aglint/shared-types';
import { Database } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiBodyParamsSignup = {
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
  role: RecruiterUserType['role'];
  flow: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, user_id, first_name, last_name, role, flow } =
      req.body as ApiBodyParamsSignup;

    const { error: errUser, data: recUser } = await supabase
      .from('recruiter_user')
      .insert({
        user_id: user_id,
        email: email,
        first_name: first_name,
        last_name: last_name || '',
        role: role,
      })
      .select();
    if (errUser) throw new Error(errUser.message);

    let rec_id = uuidv4();
    const { data: rec, error: errRec } = await supabase
      .from('recruiter')
      .insert({
        email: email,
        recruiter_type: flow,
        recruiter_active: true,
        id: rec_id,
      })
      .select();
    if (errRec) throw new Error(errRec.message);

    const { error: errRel } = await supabase.from('recruiter_relation').insert({
      role: 'admin',
      recruiter_id: rec_id,
      user_id: user_id,
      is_active: true,
      created_by: user_id,
    });
    if (errRel) throw new Error(errRel.message);

    await supabase
      .from('recruiter_user')
      .update({
        recruiter_id: rec[0].id,
        scheduling_settings: rec[0].scheduling_settings,
      })
      .eq('user_id', user_id);

    return res.status(200).json({
      recruiter_user: recUser[0],
      recruiter: rec[0],
    });
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
