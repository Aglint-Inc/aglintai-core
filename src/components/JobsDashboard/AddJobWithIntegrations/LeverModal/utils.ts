import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { processEmailsInBatches } from '../GreenhouseModal/utils';
import { extractLinkedInURL, POSTED_BY, splitFullName } from '../utils';

export const createJobApplications = async (selectedLeverPostings, apiKey) => {
  const applications = await Promise.all(
    selectedLeverPostings.map(async (post) => {
      const fetchedCandidates = await fetchAllCandidates(post.id, apiKey);
      // for creating lever job reference
      const refCandidates = fetchedCandidates.map((cand) => {
        return {
          created_at: new Date(cand.createdAt).toISOString(),
          first_name: splitFullName(cand.name).firstName,
          last_name: splitFullName(cand.name).lastName,
          email: cand.emails[0],
          linkedin: extractLinkedInURL(cand.links || []),
          phone: cand.phones[0]?.value,
          job_id: post.job_id,
          application_id: uuidv4(), //our job application id
          id: cand.id, //lever opportunity id
        };
      });
      // for creating lever job reference

      const emails = [
        ...new Set(
          refCandidates.map((cand) => {
            return cand.email;
          }),
        ),
      ];

      const checkCandidates = await processEmailsInBatches(
        emails,
        post.recruiter_id,
      );

      //new candidates insert flow
      const uniqueRefCandidates = refCandidates.filter((cand) => {
        return !checkCandidates.some((checkCand) => {
          return checkCand.email === cand.email;
        });
      });

      const insertableCandidates = uniqueRefCandidates.map((cand) => {
        return {
          first_name: cand.first_name,
          last_name: cand.last_name,
          email: cand.email,
          linkedin: cand.linkedin,
          phone: cand.phone,
          id: uuidv4(),
          recruiter_id: post.recruiter_id,
        };
      });

      const dbCandidates = insertableCandidates.filter((cand, index, self) => {
        // Use the Array.findIndex() method to check if the current email address
        // exists in the array at a previous index.
        const isUnique =
          self.findIndex((c) => c.email === cand.email) === index;
        return isUnique;
      });

      const { data: newCandidates, error: errorCandidates } = await supabase
        .from('candidates')
        .insert(dbCandidates)
        .select();

      if (!errorCandidates) {
        const allCandidates = [...newCandidates, ...checkCandidates];
        const dbApplications = refCandidates.map((ref) => {
          return {
            applied_at: ref.created_at,
            candidate_id: allCandidates.filter(
              (cand) => cand.email === ref.email,
            )[0].id,
            job_id: post.job_id,
            id: ref.application_id,
            is_resume_fetching: true,
          };
        });

        const { error } = await supabase
          .from('applications')
          .insert(dbApplications);

        if (!error) {
          const referenceObj = refCandidates.map((ref) => {
            return {
              application_id: ref.application_id,
              posting_id: post.id,
              opportunity_id: ref.id,
              public_job_id: post.job_id,
            };
          });

          await createLeverReference(referenceObj);
        } else {
          toast.error(
            'Sorry unable to import. Please try again later or contact support.',
          );
        }
        //new candidates insert flow
      }
    }),
  );
  return applications;
};

export const createLeverReference = async (reference) => {
  const { data, error } = await supabase
    .from('lever_reference')
    .insert(reference)
    .select();

  if (error) {
    toast.error(
      'Sorry unable to import. Please try again later or contact support.',
    );
  } else {
    await createGoogleTaskQueue(data);
    return data;
  }
};

export const createLeverJobReference = async (reference) => {
  const { error } = await supabase
    .from('lever_job_reference')
    .insert(reference)
    .select();

  if (error) {
    toast.error(
      'Sorry unable to import. Please try again later or contact support.',
    );
  }
};

const createGoogleTaskQueue = async (dbRecords) => {
  await axios.post('/api/lever/createQueue', {
    records: dbRecords,
  });
};

const fetchAllCandidates = async (post_id, apiKey) => {
  let allCandidates = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    try {
      const response = await axios.post('/api/lever/getCandidates', {
        posting_id: post_id,
        offset: next,
        apiKey: apiKey,
      });

      if (response.data && response.data.data) {
        allCandidates = allCandidates.concat(response.data.data);
        hasMore = response.data.hasNext;
        next = response.data.next;
      } else {
        next = 0;
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};

export const fetchAllJobs = async (apiKey) => {
  let allJobs = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    try {
      const response = await axios.post('/api/lever/getPostings', {
        offset: next,
        apiKey: apiKey,
        isInitial: false,
      });

      if (response.data && response.data.data) {
        allJobs = allJobs.concat(response.data.data);
        hasMore = response.data.hasNext;
      } else {
        next = response.data.next;
        hasMore = false; // Exit the loop if there are no more records
      }
    } catch (error) {
      hasMore = false; // Exit the loop in case of an error
    }
  }
  return allJobs;
};

export const createJobObject = async (selectedLeverPostings, recruiter) => {
  const dbJobs = selectedLeverPostings.map((post) => {
    return {
      location: post.categories.location,
      job_title: post.text,
      description: post.content.descriptionHtml,
      email_template: recruiter.email_template,
      department: post.categories.department || '',
      recruiter_id: recruiter.id,
      posted_by: POSTED_BY.LEVER,
      job_type:
        post.categories.commitment === 'Part Time'
          ? 'parttime'
          : post.categories.commitment === 'Internship'
            ? 'internship'
            : 'fulltime',
      workplace_type:
        post.workplaceType === 'hybrid'
          ? 'hybrid'
          : post.workplaceType === 'onsite'
            ? 'onsite'
            : 'offsite',
      company: recruiter.name,
      skills: [],
      status: 'published',
      parameter_weights: {
        skills: 45,
        education: 5,
        experience: 50,
      },
    };
  });
  return dbJobs;
};

export function getLeverStatusColor(state) {
  return state == 'published'
    ? '#228F67'
    : state == 'closed'
      ? '#D93F4C'
      : state == 'internal'
        ? '#ED8F1C'
        : '#d93f4c';
}
