import { createClient } from '@supabase/supabase-js';
// import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
// @ts-ignore
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { user_id, module } = req.body;
      if (!user_id) return res.status(400).json({ error: 'Bad Request!' });

      const result = await use_Credit(user_id, module);
      return res.status(200).json({ data: result, error: null });

      //   const access_token = req.cookies['access_token'];
      //   const {
      //     data: { user },
      //   } = await supabaseAdmin.auth.getUser(access_token);
    } catch (e: any) {
      return res
        .status(e.statusCode || 500)
        .json({ message: e.raw?.message || 'Server error!' });
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed');
};

export default handler;
// function parseJwt(token: string) {
//   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
// }

export async function use_Credit(
  user_id: string,
  module?:
    | 'resume'
    | 'cover_letter'
    | 'interview'
    | 'job_search'
    | 'connection_builder'
) {
  let module_credit_cost = 0;
  if (module) {
    const { data, error } = await supabaseAdmin
      .from('module_credit')
      .select('credit')
      .eq('name', module);
    if (!error && data.length) {
      module_credit_cost = data[0].credit;
    }
  }
  let curr_credit = 0;
  const result = { success: false, credit: 0 };
  const { data, error } = await supabaseAdmin
    .from('user_credit')
    .select()
    .eq('user_id', user_id);

  if (!error && data.length) {
    curr_credit = data[0].credit;
    const temp_credit = curr_credit - module_credit_cost;
    if (module && temp_credit > -1) {
      const { error } = await supabaseAdmin
        .from('user_credit')
        .update({
          credit: temp_credit,
          last_updated_at: new Date().toUTCString(),
        })
        .eq('user_id', user_id);
      if (!error) {
        result.success = true;
        result.credit = temp_credit;
      }
    } else {
      result.success = false;
      result.credit = curr_credit;
    }
  }

  return result;
}
