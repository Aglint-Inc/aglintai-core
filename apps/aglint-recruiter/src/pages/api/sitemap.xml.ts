import { type JobType } from '@aglint/shared-types';
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jobs: JobType[] | null = await fetchJobIds();
  const jobIds: string[] = jobs ? jobs.map((t: JobType) => t.id) : [];

  res.setHeader('Content-Type', 'text/xml');
  res.write('<?xml version="1.0" encoding="UTF-8"?>');
  res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  const staticPages: string[] = ['/', '/login', '/signup'];
  staticPages.forEach((url: string) => {
    res.write(`
        <url>
          <loc>${`${process.env.NEXT_PUBLIC_HOST_NAME}${url}`}</loc>
        </url>
      `);
  });

  jobIds.forEach((id: string) => {
    res.write(`
        <url>
          <loc>${`https://website.aglinthq.com/job-post/${id}`}</loc>
        </url>
      `);
  });

  res.write('</urlset>');
  res.end();
}

const fetchJobIds = async (): Promise<JobType[] | null> => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select('*')
    .eq('status', 'published')
    .eq('posted_by', 'Aglint');
  if (!error) {
    return data as JobType[];
  } else {
    return null;
  }
};
