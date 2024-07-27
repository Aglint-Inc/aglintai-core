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

  const response = await getResponse(req);

  return res.status(200).send(response);
};

export default handler;

const getResponse = async (req: NextApiRequest) => {
  const { recruiter_data: recruiter, ...job } = await getJob(req.body.query);
  let post = { ...job };

  if (req.body.preview || job.status === 'draft') {
    post = { ...post, ...post.draft };
  }
  const isValid = job.status !== 'closed';

  return { recruiter, jobs: [job], isValid: isValid, post: post };
};

const getJob = async (query: string) =>
  (
    await supabase
      .from('public_jobs')
      .select(
        '*, recruiter_data:recruiter!public_jobs_recruiter_id_fkey(id, logo, name, office_locations(*),company_overview, employee_size, socials, company_website, industry)',
      )
      .eq('status', 'published')
      .or(query)
      .single()
      .throwOnError()
  ).data;

export type PublicJobAPI = Awaited<ReturnType<typeof getResponse>>;
