/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { Database } from '@/src/types/schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let recruiter = req.body.recruiter;
  let fileId = req.body.fileId;
  let post = req.body.post;
  let profile = req.body.profile;
  let uploadUrl = req.body.uploadUrl;

  if (!profile) {
    return res.status(400).send('No profile provided');
  }
  if (!recruiter) {
    return res.status(400).send('No recruiter provided');
  }
  if (!fileId) {
    return res.status(400).send('No file provided');
  }
  if (!post) {
    return res.status(400).send('No post provided');
  }
  if (!uploadUrl) {
    return res.status(400).send('No uploadUrl provided');
  }

  const { data: checkCand, error: errorCheck } = await supabase
    .from('new_candidate')
    .select('*')
    .match({ email: profile.email, recruiter_id: recruiter.id });

  let candidateId;
  let application;
  console.log(checkCand, 'checkCand');

  if (!errorCheck && checkCand.length == 0) {
    candidateId = uuidv4();
    console.log(uploadUrl, post.id, candidateId, recruiter.id, fileId, profile);

    const response = await insertCandidate(
      uploadUrl,
      post.id,
      candidateId,
      recruiter.id,
      fileId,
      profile,
    );

    application = response;
    return res.status(200).send({ application: application });
  } else {
    const { data: checkApplication, error: errorCheck } = await supabase
      .from('new_application')
      .select()
      .eq('candidate_id', checkCand[0].id)
      .eq('job_id', post.id);

    if (!errorCheck) {
      if (checkApplication.length == 0) {
        await supabase
          .from('new_candidate_files')
          .insert({
            candidate_id: checkCand[0].id,
            file_url: uploadUrl,
            id: fileId,
            type: 'resume',
          })
          .select();
        const { data: newApplication } = await supabase
          .from('new_application')
          .insert({
            candidate_id: checkCand[0].id,
            job_id: post.id,
            status: 'new',
            candidate_file_id: fileId,
          })
          .select();

        application = newApplication[0];

        return res.status(200).send({ application: application });
      } else {
        return res.status(200).send({ application: null, applied: true });
      }
    } else {
      console.log(errorCheck);
    }
  }
};

export default handler;

const insertCandidate = async (
  uploadUrl: string,
  jobId: string,
  candidateId: string,
  recruiterId: string,
  fileId: string,
  profile: any,
) => {
  const { error: errorCandidate } = await supabase
    .from('new_candidate')
    .insert({
      first_name: profile.firstName,
      last_name: profile.lastName || '',
      email: profile.email,
      recruiter_id: recruiterId,
      id: candidateId,
    });

  if (!errorCandidate) {
    await supabase
      .from('new_candidate_files')
      .insert({
        candidate_id: candidateId,
        file_url: uploadUrl,
        id: fileId,
        type: 'resume',
      })
      .select();

    const { data: newApplication } = await supabase
      .from('new_application')
      .insert({
        candidate_id: candidateId,
        job_id: jobId,
        status: 'new',
        candidate_file_id: fileId,
      })
      .select();

    return newApplication[0];
  } else {
    console.log(errorCandidate);
  }
};
