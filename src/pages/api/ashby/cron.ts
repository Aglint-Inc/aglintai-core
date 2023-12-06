/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const url1 = `${process.env.NEXT_PUBLIC_HOST_NAME}/api/ashby/syncapplications`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data, error } = await supabase
      .from('recruiter')
      .select('ashby_key, ashby_sync_token, name, id')
      .not('ashby_key', 'is', null);
    if (error) {
      throw new Error(error.message);
    } else {
      if (data?.length > 0) {
        await Promise.all(
          data.map(async (rec) => {
            try {
              axios.post(`${url1}`, {
                synctoken: rec.ashby_sync_token,
                apikey: rec.ashby_key,
              });
              console.log('Request successful for application:', rec.name);
              return res.status(200).send('success');
            } catch (error) {
              console.error('Error for application:', rec.name, error.message);
              return res.status(400).send(JSON.stringify(error.message));
              // You might want to handle errors here
            }
          }),
        );
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
