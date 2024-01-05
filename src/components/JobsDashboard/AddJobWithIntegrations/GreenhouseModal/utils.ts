import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  CandidateType,
  GreenhouseRefDbType,
  GreenhouseType,
  JobApplcationDB,
  NewCandidateType,
  RecruiterDB,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  ExtendedJobGreenhouse,
  GreenhouseApplication,
  JobGreenhouse,
} from './types';
import { POSTED_BY } from '../utils';

export const createJobApplications = async (
  selectedLeverPostings: ExtendedJobGreenhouse[],
  apiKey: string,
) => {
  await Promise.all(
    selectedLeverPostings.map(async (post) => {
      const fetchedCandidates = await fetchAllCandidates(post.job_id, apiKey);

      // for creating greenhouse job reference
      const refCandidates = fetchedCandidates
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
              job_id: post.public_job_id,
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
        post.recruiter_id,
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
          recruiter_id: post.recruiter_id,
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
        .from('new_candidate')
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
                job_id: post.public_job_id,
                id: ref.application_id,
                is_resume_fetching: true,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        const { error } = await supabase
          .from('new_application')
          .insert(dbApplications);

        if (!error) {
          const referenceObj = refCandidates.map((ref) => {
            return {
              application_id: ref.application_id,
              posting_id: post.id,
              greenhouse_id: ref.id,
              public_job_id: post.public_job_id,
              resume: ref.resume,
            };
          }) as unknown as GreenhouseType[];
          await createReference(referenceObj);
        } else {
          toast.error(
            'Sorry unable to import. Please try again later or contact support.',
          );
        }
      }
      //new candidates insert flow
    }),
  );
};

export const fetchAllCandidates = async (
  post_id: string,
  apiKey: string,
): Promise<GreenhouseApplication[]> => {
  let allCandidates = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    try {
      const response = await axios.post('/api/greenhouse/getCandidates', {
        job_id: post_id,
        page: page,
        apiKey: apiKey,
      });

      if (response.data && response.data) {
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
      hasMore = false; // Exit the loop in case of an error
    }
  }

  return allCandidates;
};

export const fetchAllJobs = async (
  apiKey: string,
): Promise<JobGreenhouse[]> => {
  //pagination need to done
  let allJobs = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    try {
      const response = await axios.post('/api/greenhouse/getPostings', {
        apiKey: apiKey,
        isInitial: false,
        page: page,
      });

      if (response.status == 200 && response.data) {
        allJobs = allJobs.concat(response.data);
        if (response.data.length == 500) {
          hasMore = true;
          page = page + 1;
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

export const createJobObject = async (
  selectedPostings: ExtendedJobGreenhouse[],
  recruiter: RecruiterDB,
): Promise<Partial<JobApplcationDB> & { recruiter_id: string }[]> => {
  const dbJobs = selectedPostings.map((post) => {
    return {
      location: post.location.name,
      job_title: post.title,
      description: post.content,
      email_template: recruiter.email_template,
      recruiter_id: recruiter.id,
      posted_by: POSTED_BY.GREENHOUSE,
      job_type: 'fulltime',
      workplace_type: 'onsite',
      company: recruiter.name,
      skills: [],
      status: 'published',
      parameter_weights: {
        skills: 45,
        education: 5,
        experience: 50,
      },
      id: post.public_job_id,
    };
  });
  return dbJobs;
};

export function getLeverStatusColor(state: string): string {
  return state == 'published'
    ? '#228F67'
    : state == 'closed'
      ? '#D93F4C'
      : state == 'internal'
        ? '#ED8F1C'
        : '#d93f4c';
}

export function extractLinkedInURLGreenhouse(item: string): string {
  // Check if the item starts with "http://linkedin.com" or "https://linkedin.com"
  if (
    item.startsWith('http://linkedin.com') ||
    item.startsWith('https://linkedin.com')
  ) {
    return item; // Return the LinkedIn URL
  } else {
    return '';
  }
}

export const createReference = async (
  reference: GreenhouseType[],
): Promise<GreenhouseRefDbType[] | undefined> => {
  const { data, error } = await supabase
    .from('greenhouse_reference')
    .insert(reference)
    .select();

  if (error) {
    toast.error(
      'Sorry unable to import. Please try again later or contact support.',
    );
    return undefined;
  } else {
    return data;
  }
};

const MAX_EMAILS_PER_BATCH = 100; // adjust this number based on your requirements

const processBatch = async (
  emailBatch: string[],
  recruiter_id: string,
): Promise<NewCandidateType[] | undefined> => {
  const { data: checkCandidates, error: errorCheck } = await supabase
    .from('new_candidate')
    .select()
    .in('email', emailBatch)
    .eq('recruiter_id', recruiter_id);

  if (!errorCheck) {
    return checkCandidates;
  } else {
    return [];
  }
};

export const processEmailsInBatches = async (
  emails: string[],
  recruiter_id: string,
): Promise<CandidateType[] | undefined> => {
  let allCandidates = [];
  for (let i = 0; i < emails.length; i += MAX_EMAILS_PER_BATCH) {
    const emailBatch = emails.slice(i, i + MAX_EMAILS_PER_BATCH);
    const cand = await processBatch(emailBatch, recruiter_id);
    allCandidates = [...allCandidates, ...cand];
  }
  return allCandidates;
};

export const filterJobs = (jobs: JobGreenhouse[], filter: string) => {
  const filJobs = jobs.filter((job) => {
    if (filter == 'live') {
      return job.live;
    } else if (filter == 'closed') {
      return !job.active;
    } else if (filter == 'active') {
      return job.active;
    } else {
      return true;
    }
  });
  return filJobs;
};

export function getGreenhouseStatusColor(job: JobGreenhouse) {
  if (job.live) {
    return '#228F67';
  } else if (!job.active) {
    return '#D93F4C';
  } else if (job.active) {
    return '#ED8F1C';
  } else {
    return '#d93f4c';
  }
}
