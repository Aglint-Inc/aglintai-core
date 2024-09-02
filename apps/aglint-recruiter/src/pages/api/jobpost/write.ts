/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { fillEmailTemplate } from '@/src/utils/support/supportUtils';

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
    .from('candidates')
    .select('*')
    .match({ email: profile.email, recruiter_id: recruiter.id });

  let candidateId;
  let application;

  if (!errorCheck && checkCand.length == 0) {
    candidateId = uuidv4();

    const response = await insertCandidate(
      uploadUrl,
      post.id,
      candidateId,
      recruiter.id,
      fileId,
      profile,
    );

    await mailHandler(response.application.id, profile, post);
    return res.status(200).send({
      application: response.application,
      candidate: response.candidate,
    });
  } else {
    const { data: checkApplication, error: errorCheck } = await supabase
      .from('applications')
      .select()
      .eq('candidate_id', checkCand[0].id)
      .eq('job_id', post.id);

    if (!errorCheck) {
      if (checkApplication.length == 0) {
        await supabase
          .from('candidate_files')
          .insert({
            candidate_id: checkCand[0].id,
            file_url: uploadUrl,
            id: fileId,
            type: 'resume',
          })
          .select();
        const { data: newApplication } = await supabase
          .from('applications')
          .insert({
            candidate_id: checkCand[0].id,
            job_id: post.id,
            status: 'new',
            candidate_file_id: fileId,
            source: 'apply_link',
            recruiter_id: recruiter.id,
          })
          .select();

        application = newApplication[0];
        await mailHandler(newApplication[0].id, profile, post);
        return res
          .status(200)
          .send({ application: application, candidate: checkCand[0] });
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
  const { data: candidate, error: errorCandidate } = await supabase
    .from('candidates')
    .insert({
      first_name: profile.firstName,
      last_name: profile.lastName || '',
      email: profile.email,
      recruiter_id: recruiterId,
      id: candidateId,
    })
    .select();

  if (!errorCandidate) {
    await supabase
      .from('candidate_files')
      .insert({
        candidate_id: candidateId,
        file_url: uploadUrl,
        id: fileId,
        type: 'resume',
      })
      .select();

    const { data: newApplication } = await supabase
      .from('applications')
      .insert({
        candidate_id: candidateId,
        job_id: jobId,
        status: 'new',
        candidate_file_id: fileId,
        source: 'apply_link',
        recruiter_id: recruiterId,
      })
      .select();

    return { application: newApplication[0], candidate: candidate };
  } else {
    console.log(errorCandidate);
  }
};

const mailHandler = async (application_id: string, profile, post) => {
  try {
    const email = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      job_title: post.job_title,
      company_name: post.company,
      support_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${application_id}`,
    };
    console.log(email, 'email');

    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, {
        fromEmail: `messenger@aglinthq.com`,
        fromName:
          post.email_template.application_received.fromName || post.company,
        email: profile?.email,
        subject: fillEmailTemplate(
          post.email_template.application_received.subject,
          email,
        ),
        text: fillEmailTemplate(
          post.email_template.application_received.body,
          email,
        ),
      })
      .then((res) => {
        console.log(res, 'res');

        if (res.status === 200 && res.data.data === 'Email sent') {
          return true;
        }
      });
  } catch (err) {
    //}
  }
};
