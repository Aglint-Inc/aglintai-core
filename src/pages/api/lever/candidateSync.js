/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

import {
  extractLinkedInURL,
  splitFullName,
} from '@/src/components/JobsDashboard/AddJobWithIntegrations/utils';
const crypto = require('crypto');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const jobId = req.body.job_id;
  let apiKey;
  let previousApplications = [];

  if (!jobId) {
    console.log('No job id found');
    res.status(400).send('No job id found');
    return;
  }
  const { data: referenceJob, error: errorJob } = await supabase
    .from('lever_job_reference')
    .select('*')
    .eq('job_id', jobId);
  if (!errorJob) {
    if (referenceJob.length === 0) {
      console.log('No job reference found');
      res.status(400).send('No job reference found');
      return;
    }
    const { data: app, error: errorApp } = await supabase
      .from('lever_reference')
      .select('*')
      .eq('public_job_id', jobId);

    if (!errorApp) {
      previousApplications = app;
      const { data: rec, error: errorRec } = await supabase
        .from('recruiter')
        .select('*')
        .eq('id', referenceJob[0].recruiter_id);
      if (!errorRec) {
        apiKey = decrypt(rec[0].lever_key, process.env.ENCRYPTION_KEY);
        const leverApplications = await fetchAllJobs(
          apiKey,
          referenceJob[0].posting_id,
        );
        const newApplications = [];
        leverApplications.forEach(async (appi) => {
          // Check if app.id does not exist in previousApplications

          const isNew =
            previousApplications?.filter((p) => p.opportunity_id === appi.id)
              .length === 0;

          if (isNew) {
            // Push the new application to the newApplications array
            newApplications.push(appi);
          }
        });

        if (newApplications.length === 0) {
          console.log('No new applications found');
          res.status(200).send('No new applications found');
        }

        const dbCandidates = newApplications.map((cand) => {
          return {
            first_name: splitFullName(cand.name).firstName,
            last_name: splitFullName(cand.name).lastName,
            email: cand.emails[0],
            linkedin: extractLinkedInURL(cand.links || []),
            phone: cand.phones[0]?.value,
            job_id: jobId,
          };
        });

        const { data: newCandidates, error } = await supabase
          .from('job_applications')
          .insert(dbCandidates)
          .select();

        if (!error) {
          const referenceObj = newCandidates.map((app) => {
            return {
              application_id: app.application_id,
              posting_id: referenceJob[0].posting_id,
              opportunity_id: leverApplications.filter(
                (cand) => cand.emails[0] == app.email,
              )[0].id,
              public_job_id: app.job_id,
            };
          });
          const responseLeverRef = await createLeverReference(referenceObj);
          res.status(200).send(responseLeverRef);
        } else {
          res.status(400).send('Error inserting into job_applications');
        }
      }
    }
  }
}

// Decrypt data using AES-256
function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

const fetchAllJobs = async (apiKey, postingId) => {
  let allJobs = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    let url;
    if (next === 0) {
      url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}`;
    } else {
      url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}&offset=${next}`;
    }

    try {
      const response = await axios.get(url, {
        auth: {
          username: apiKey,
          password: '',
        },
      });
      if (response.data && response.data.data) {
        allJobs = allJobs.concat(response.data.data);
        if (response.data.hasNext) {
          next = response.data.next;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }
  return allJobs;
};

const createLeverReference = async (reference) => {
  const { data, error } = await supabase
    .from('lever_reference')
    .insert(reference)
    .select();

  if (error) {
    return error;
  } else {
    await createGoogleTaskQueue(data);
    return data;
  }
};

const createGoogleTaskQueue = async (dbRecords) => {
  let data = JSON.stringify({
    records: dbRecords,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://us-central1-aglint-cloud-381414.cloudfunctions.net/enqueueTask',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  await axios.request(config).then((response) => {
    if (response.status == 200) {
      return 'successfully created queue';
    }
  });
};
