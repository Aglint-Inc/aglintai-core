require('dotenv').config();
import type {
  Request,
  Response,
} from '@google-cloud/functions-framework/build/src/functions';
import { supabase, supabaseWrap } from './config/supabaseClient';
import {
  CandFilesType,
  CandidatesType,
  JobApplicationType,
  PublicJobType,
} from './schema/db/database.types';
import { updateCandidateDetails } from './utils/updateCandDetails';
import { updatestatus } from './utils/updatestatus';
import { getOverallResumeScore } from './utils/getJDScore';
import { logApi } from './utils/logApi';
const functions = require('@google-cloud/functions-framework');

type BodyParams = {
  application_id: string;
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

  const { application_id } = request.body as BodyParams;
  if (!application_id)
    return response.status(400).send('application_id not included');

  try {
    const [jobApplication] = supabaseWrap(
      await supabase.from('applications').select().eq('id', application_id)
    ) as JobApplicationType[];

    if (!jobApplication) {
      return response
        .status(400)
        .send('job application not found with that application_id');
    }

    const [publicjob] = supabaseWrap(
      await supabase
        .from('public_jobs')
        .select()
        .eq('id', jobApplication.job_id || '')
    ) as PublicJobType[];

    let [candidate] = supabaseWrap(
      await supabase
        .from('candidates')
        .select()
        .eq('id', jobApplication.candidate_id || '')
    ) as CandidatesType[];

    let [candFiles] = supabaseWrap(
      await supabase
        .from('candidate_files')
        .select()
        .eq('id', jobApplication.candidate_file_id || '')
    ) as CandFilesType[];

    if (candidate.email === candidate.id) {
      // fill candidate details
      candidate = await updateCandidateDetails(
        candFiles.resume_json as any,
        candidate,
        jobApplication.id,
        candidate.recruiter_id,
        jobApplication.candidate_file_id as string
      );
    }

    const status = await updatestatus(
      publicjob.new_screening_setting as any,
      jobApplication.overall_score as number,
      jobApplication,
      candidate,
      publicjob.email_template,
      publicjob.assessment as boolean,
      publicjob.company as string,
      publicjob.job_title as string
    );
    logApi(status);
    return response.status(200).send(status);
  } catch (err: any) {
    logApi(err);
    response.status(400).send(err.message);
  }
});
