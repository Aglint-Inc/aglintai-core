/* eslint-disable no-console */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type ApiBodyParamsSignup = {
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, user_id, first_name, last_name } =
      req.body as ApiBodyParamsSignup;

    const { error: errUser, data: recUser } = await supabase
      .from('recruiter_user')
      .insert({
        user_id: user_id,
        email: email,
        first_name: first_name,
        last_name: last_name || '',
        status: 'active',
      })
      .select()
      .single();

    console.log('recUser', recUser.user_id);

    if (errUser) throw new Error(errUser.message);

    let rec_id = uuidv4();
    const { data: rec } = await supabase
      .from('recruiter')
      .insert({
        email: email,
        recruiter_type: 'Company',
        id: rec_id,
        primary_admin: user_id,
      })
      .select()
      .single()
      .throwOnError();

    await sleep(3000);

    const { data: rol } = await supabase
      .from('roles')
      .select()
      .eq('name', 'admin')
      .eq('recruiter_id', rec.id)
      .single()
      .throwOnError();

    await supabase.from('recruiter_relation').insert({
      role: 'admin',
      recruiter_id: rec_id,
      user_id: user_id,
      is_active: true,
      created_by: user_id,
      role_id: rol.id,
    });

    await supabase
      .from('recruiter_user')
      .update({
        recruiter_id: rec.id,
        scheduling_settings: rec.scheduling_settings,
      })
      .eq('user_id', user_id);

    return res.status(200).json({
      recruiter_user: recUser,
      recruiter: rec,
    });
  } catch (error) {
    console.log('error', error.message);
    res.status(400).send(error.message);
  }
};

export default handler;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
