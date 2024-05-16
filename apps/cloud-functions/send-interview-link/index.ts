import type {
  Request,
  Response,
} from '@google-cloud/functions-framework/build/src/functions';
import { supabase, supabaseWrap } from './src/config/supabase';
import { PublicJobDbType } from './src/schema/db/tables';
import { sendEmailToCandidates } from './src/utils/sendEmailToCandidates';
const functions = require('@google-cloud/functions-framework');

type BodyParams = {
  jobIds: string[];
};

// api function
functions.http('helloHttp', async (request: Request, response: Response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', '*');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  }

  if (request.method !== 'POST') {
    return response.status(405).end('Method Not Allowed');
  }

  try {
    const scheduled_jobs = supabaseWrap(
      await supabase.rpc('get_present_scheduled_jobs')
    ) as JobInfo[];

    let jobIds: string[] = [];
    if (scheduled_jobs && scheduled_jobs.length > 0) {
      jobIds = scheduled_jobs.map((j) => j.job_id);
    }
    for (let jobId of jobIds) {
      await sendEmailToCandidates(jobId);
    }
    return response.status(200).json(scheduled_jobs);
  } catch (err: any) {
    return response.status(200).send('Hello');
  }
});

interface JobInfo {
  job_id: string;
  job_title: string;
  time_stamp: string;
  current_date: string;
}
