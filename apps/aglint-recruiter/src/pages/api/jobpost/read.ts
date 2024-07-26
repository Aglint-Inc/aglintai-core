/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

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

  if (!req.body.query) {
    return res.status(400).send('No query provided');
  }

  let isValid = false;
  let post;

  const { data, error } = await supabase
    .from('public_jobs')
    .select('*')
    .or(req.body.query);

  if (!error && data?.length > 0) {
    if (data[0]?.status == 'closed' ) {
      isValid = false;
    } else {

      
      if ((req.body.preview || data[0]?.status == 'draft') && data[0]?.draft) {
        post = data[0].draft;
      } else {
        post = data[0];
      }


      isValid = true;
    }
    const { data: rec } = await supabase
      .from('recruiter')
      .select(
        'id, logo, name, office_locations,company_overview,employee_size,socials,company_website,industry',
      )
      .eq('id', data[0].recruiter_id);

    const { data: jobs } = await supabase
      .from('public_jobs')
      .select('*')
      .eq('recruiter_id', data[0].recruiter_id)
      .eq('status', 'published');

    return res
      .status(200)
      .send({ recruiter: rec[0], jobs: jobs, isValid: isValid, post: post });
  }
};

export default handler;
