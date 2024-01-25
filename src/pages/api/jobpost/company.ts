/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/src/types/schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '3600');
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'invalid request method', success: false });
  }

  if (!req.body.job_id) {
    return res.status(400).send('No job_id provided');
  }

  let jobs = [];

  const { data: recruiter, error } = await supabase
    .from('recruiter')
    .select('*')
    .eq('id', req.body.job_id);
  if (!error && recruiter?.length > 0) {
    const { data: jobsDb, error: errorJob } = await supabase
      .from('public_jobs')
      .select('*')
      .eq('recruiter_id', recruiter[0].id);
    if (!errorJob) {
      jobs = jobsDb;
    }
    return res.status(200).send({ recruiter: recruiter[0], jobs: jobs });
  }
};

export default handler;
