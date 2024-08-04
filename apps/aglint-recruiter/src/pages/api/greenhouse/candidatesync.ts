/* eslint-disable no-console */
import { DatabaseTableInsert, GreenhouseType } from '@aglint/shared-types';
import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { GreenhouseApplication } from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/types';
import {
  createReference,
  extractLinkedInURLGreenhouse,
  processEmailsInBatches,
} from '@/src/components/Jobs/Dashboard/AddJobWithIntegrations/GreenhouseModal/utils';

import { decrypt } from '../decryptApiKey';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(req, res) {
  const jobId = req.body.job_id;
  let previousApplications = [];

  if (!jobId) {
    console.log('No job id found');
    res.status(400).send('No job id found');
    return;
  }
  const { data: referenceJob, error: errorJob } = await supabase
    .from('job_reference')
    .select('*')
    .eq('public_job_id', jobId);
  if (!errorJob) {
    if (referenceJob.length === 0) {
      console.log('No job reference found');
      res.status(400).send('No job reference found');
      return;
    }

    const { data: app, error: errorApp } = await supabase
      .from('greenhouse_reference')
      .select('*')
      .eq('public_job_id', jobId);

    if (errorApp) {
      console.log(errorApp.message);
      return res.status(400).send(errorApp.message);
    }

    previousApplications = app;

    const { data: rec, error: errorRec } = await supabase
      .from('integrations')
      .select('*')
      .eq('recruiter_id', referenceJob[0].recruiter_id);

    if (errorApp) {
      console.log(errorRec.message);
      return res.status(400).send(errorRec.message);
    }

    if (rec.length > 0) {
      const fetchedCandidates = await fetchAllCandidates(
        referenceJob[0].ats_job_id,
        rec[0].greenhouse_key,
      );

      const newCandidatesGreenhouse = [];
      fetchedCandidates.forEach(async (appi) => {
        // Check if app.id does not exist in previousApplications

        const isNew =
          previousApplications?.filter((p) => p.greenhouse_id == appi.id)
            .length === 0;

        if (isNew) {
          // Push the new application to the newApplications array
          newCandidatesGreenhouse.push(appi);
        }
      });

      if (newCandidatesGreenhouse.length === 0) {
        console.log('No new candidates found');
        return res.status(200).send('No new candidates found');
      }
      console.log(
        newCandidatesGreenhouse.length + ' new candidates found for' + jobId,
      );

      const refCandidates = newCandidatesGreenhouse
        .map((cand) => {
          if (cand.email_addresses[0]?.value) {
            return {
              created_at: cand.created_at,
              first_name: cand.first_name,
              last_name: cand.last_name,
              email: cand.email_addresses[0]?.value,
              job_title: cand.title,
              company: cand.company,
              profile_image: cand.photo_url,
              linkedin: extractLinkedInURLGreenhouse(
                cand.website_addresses[0]?.value || '',
              ),
              phone: cand.phone_numbers[0]?.value,
              resume:
                cand.attachments?.filter((res) => res.type == 'resume')
                  ?.length != 0
                  ? cand.attachments.filter((res) => res.type == 'resume')[0]
                      ?.url
                  : cand.attachments[0]?.url,
              job_id: jobId,
              application_id: uuidv4(), //our job application id
              id: cand.id, //greenhouse candidate id
            };
          } else {
            return null;
          }
        })
        .filter(Boolean); // Remove null entries;

      //for creating greenhouse job reference

      const emails = [
        ...new Set(
          refCandidates.map((cand) => {
            return cand.email;
          }),
        ),
      ];

      const checkCandidates = await processEmailsInBatches(
        emails,
        rec[0].id,
        supabase,
      );

      //new candidates insert flow
      const uniqueRefCandidates = refCandidates.filter((cand) => {
        return !checkCandidates.some((checkCand) => {
          return checkCand.email === cand.email;
        });
      });

      //email which are not their in candidates table we are inserting them
      const insertableCandidates = uniqueRefCandidates.map((cand) => {
        return {
          first_name: cand.first_name,
          last_name: cand.last_name,
          email: cand.email,
          linkedin: cand.linkedin,
          phone: cand.phone,
          id: uuidv4(),
          recruiter_id: rec[0].id,
        };
      });

      //in that check duplicate email are their or not
      const dbCandidates = insertableCandidates.filter((cand, index, self) => {
        // Use the Array.findIndex() method to check if the current email address
        // exists in the array at a previous index.
        const isUnique =
          cand.email && self.findIndex((c) => c.email === cand.email) === index;

        // Return true if the email is unique and not null, otherwise false.
        return isUnique;
      });

      const { data: newCandidates, error: errorCandidates } = await supabase
        .from('candidates')
        .insert(dbCandidates)
        .select();

      if (!errorCandidates) {
        const allCandidates = [...newCandidates, ...checkCandidates];

        const dbApplications = refCandidates
          .map((ref) => {
            const matchingCandidate = allCandidates.find(
              (cand) => cand.email === ref.email,
            );

            if (matchingCandidate && matchingCandidate.id) {
              return {
                applied_at: ref.created_at,
                candidate_id: matchingCandidate.id,
                job_id: jobId,
                id: ref.application_id,
                is_resume_fetching: true,
                source: 'greenhouse',
              } as DatabaseTableInsert['applications'];
            } else {
              return null;
            }
          })
          .filter(Boolean);

        const { error } = await supabase
          .from('applications')
          .insert(dbApplications);

        if (!error) {
          const referenceObj = refCandidates.map((ref) => {
            return {
              application_id: ref.application_id,
              posting_id: referenceJob[0].ats_job_id,
              greenhouse_id: ref.id,
              public_job_id: jobId,
              resume: ref.resume,
            };
          }) as unknown as GreenhouseType[];
          await createReference(referenceObj);
          console.log(`${dbApplications.length} successfully imported`);
          return res.status(200).send('Synced successfully');
        } else {
          console.log(error.message);
          return res.status(400).send(error.message);
        }
      }

      //new candidates insert flow
    } else {
      res.status(400).send('Unable to fetch recruiter');
    }
  }
}

const fetchAllCandidates = async (
  post_id: string,
  apiKey: string,
): Promise<GreenhouseApplication[]> => {
  let allCandidates = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    try {
      const url = `https://harvest.greenhouse.io/v1/candidates?job_id=${post_id}&per_page=500&page=${page}`;
      const response = await axios.get(url, {
        auth: {
          username: decrypt(apiKey, process.env.ENCRYPTION_KEY),
          password: '',
        },
      });

      if (response.data) {
        allCandidates = allCandidates.concat(response.data);
        if (response.data.length > 0) {
          hasMore = true;
          page = page + 1;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      console.log(error);
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};
