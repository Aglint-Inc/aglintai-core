/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
const crypto = require('crypto');
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import { splitFullName } from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

let bucketName = 'resume-job-post';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const json = req.body.ats_json;
  const recruiter_id = req.body.recruiter_id;
  const job_id = req.body.job_id;
  const apiKey = req.body.apikey;
  const decryptedApiKey = decrypt(apiKey, process.env.ENCRYPTION_KEY);
  const base64decryptedApiKey = btoa(decryptedApiKey + ':');
  console.log('ats_json_id', json.id);
  console.log('recruiter_id', recruiter_id);
  if (!json) {
    return res.status(200).json('no json');
  }
  if (!recruiter_id) {
    return res.status(200).json('no recruiter id');
  }
  if (!job_id) {
    return res.status(200).json('no job id');
  }
  if (!apiKey) {
    return res.status(200).json('no api key');
  }
  try {
    if (json) {
      await supabase
        .from('application_reference')
        .update({ is_processed: true })
        .eq('recruiter_id', recruiter_id)
        .eq('ats_json->>id', json.id);

      let application = json;
      if (!application?.candidate?.primaryEmailAddress?.value) {
        console.log('no email in ashby application');
        return res.status(200).json('no email in ashby application');
      }

      const { data: checkApp, error: checkError } = await supabase
        .from('job_applications')
        .select('recruiter_id, application_id, candidates(*)')
        .eq('recruiter_id', recruiter_id)
        .eq('job_id', job_id)
        .eq('countries.email', application.candidate.primaryEmailAddress.value);
      if (!checkError && checkApp.length > 0) {
        return res
          .status(200)
          .json('email already exists in job application table');
      }

      let candidate = await getCandidate(
        application.candidate.id,
        base64decryptedApiKey,
      );
      if (candidate?.results?.fileHandles[0]?.handle) {
        let resume = await getResume(
          candidate?.results?.fileHandles[0]?.handle,
          base64decryptedApiKey,
        );
        if (resume?.results?.url) {
          let cand = {
            first_name: splitFullName(candidate.results.name).firstName,
            last_name: splitFullName(candidate.results.name).lastName,
            email: application.candidate.primaryEmailAddress.value,
            job_title: candidate.results.position,
            company: candidate.results.company,
            linkedin: candidate.results.socialLinks.filter(
              (link) => link.type === 'LinkedIn',
            )[0]?.url,
            phone: candidate.results.phoneNumbers[0]?.value,
          };

          const { data: dataCand, error: errorCand } = await supabase
            .from('candidates')
            .select()
            .eq('email', application.candidate.primaryEmailAddress.value)
            .eq('recruiter_id', recruiter_id);

          if (!errorCand && dataCand?.length > 0) {
            const res = await uploadResume(
              dataCand[0].id,
              job_id,
              resume.results.url,
            );
            const fileLink = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${res.path}`;
            console.log(fileLink, 'resume');

            await createJobApplication(
              dataCand[0].id,
              job_id,
              json.createdAt,
              fileLink,
            );
          } else {
            let candCreated = await createCandidate(cand, recruiter_id);

            if (candCreated) {
              const res = await uploadResume(
                candCreated[0].id,
                job_id,
                resume.results.url,
              );
              let fileLink = null;
              if (res) {
                fileLink = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${res.path}`;
              }
              console.log(fileLink, 'resume');
              await createJobApplication(
                candCreated[0].id,
                job_id,
                json.createdAt,
                fileLink,
              );
            }
          }

          return res.status(200).json(resume);
        } else {
          console.log('no resume');
          return res.status(200).json([]);
        }
      } else {
        console.log('no resume in candidate');
        return res.status(200).json([]);
      }
    } else {
      console.log('no json');
      return res.status(200).json('no json');
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  } finally {
    //
  }
};

export default handler;

// Decrypt data using AES-256
function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

const getCandidate = async (id: string, key: string): Promise<any> => {
  const options = {
    method: 'POST',
    url: 'https://api.ashbyhq.com/candidate.info',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${key}`,
    },
    data: { id: id },
  };

  const response = await axios.request(options);
  return response.data;
};

const getResume = async (handle: string, key: string): Promise<any> => {
  const options = {
    method: 'POST',
    url: 'https://api.ashbyhq.com/file.info',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${key}`,
    },
    data: { fileHandle: handle },
  };

  const response = await axios.request(options);
  return response.data;
};

const createJobApplication = async (
  candidate_id: string,
  job_id: string,
  created_at: string,
  resume_url?: string,
): Promise<any> => {
  await supabase
    .from('job_applications')
    .insert({
      candidate_id: candidate_id,
      job_id: job_id,
      resume: resume_url,
      applied_at: created_at,
      is_resume_fetching: false,
    })
    .select();
};

const createCandidate = async (cand, recruiter_id: string): Promise<any> => {
  const { data, error } = await supabase
    .from('candidates')
    .insert({
      first_name: cand.first_name,
      last_name: cand.last_name,
      email: cand.email,
      job_title: cand.job_title,
      company: cand.company,
      linkedin: cand.linkedin,
      phone: cand.phone,
      recruiter_id: recruiter_id,
    })
    .select();

  if (!error) {
    return data;
  } else {
    return null;
  }
};

const uploadResume = async (
  candidate_id: string,
  job_id: string,
  url: string,
) => {
  const responseUrl = await axios.get(url, {
    responseType: 'arraybuffer', // Request binary data
  });

  if (responseUrl.status !== 200) {
    throw new Error(`Failed to fetch file from URL: ${responseUrl.statusText}`);
  }

  let extension = responseUrl.headers['content-type'];
  let type;

  if (extension === 'application/pdf') {
    type = '.pdf';
  } else if (
    extension ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    type = '.docx';
  } else if (extension === 'text/plain') {
    type = '.txt';
  }
  if (type) {
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(`public/${candidate_id}/${job_id + type}`, responseUrl.data, {
        contentType: extension,
        cacheControl: '3600',
        upsert: true,
      });
    if (!uploadError) {
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
