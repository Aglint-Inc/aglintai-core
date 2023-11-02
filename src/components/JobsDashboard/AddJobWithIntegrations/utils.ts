import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

export const createJobApplications = async (selectedLeverPostings, apiKey) => {
  const applications = await Promise.all(
    selectedLeverPostings.map(async (post) => {
      const allCandidates = await fetchAllCandidates(post.id, apiKey);
      // for creating lever job reference
      const refCandidates = allCandidates.map((cand) => {
        return {
          first_name: splitFullName(cand.name).firstName,
          last_name: splitFullName(cand.name).lastName,
          email: cand.emails[0],
          linkedin: extractLinkedInURL(cand.links || []),
          phone: cand.phones[0]?.value,
          job_id: post.job_id,
          application_id: uuidv4(),
          id: cand.id,
        };
      });
      // for creating lever job reference

      const dbCandidates = allCandidates.map((cand) => {
        return {
          first_name: splitFullName(cand.name).firstName,
          last_name: splitFullName(cand.name).lastName,
          email: cand.emails[0],
          linkedin: extractLinkedInURL(cand.links || []),
          phone: cand.phones[0]?.value,
          job_id: post.job_id,
          application_id: uuidv4(),
        };
      });
      // TODO: FIX 'any'
      const { error } = await supabase
        .from('job_applications')
        .insert(dbCandidates as any)
        .select();

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
    }),
  );
  return applications;
};

export function extractLinkedInURL(arr) {
  for (const item of arr) {
    // Check if the item starts with "http://linkedin.com" or "https://linkedin.com"
    if (
      item.startsWith('http://linkedin.com') ||
      item.startsWith('https://linkedin.com')
    ) {
      return item; // Return the LinkedIn URL
    }
  }

  // Return an empty string if no LinkedIn URL is found
  return '';
}

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
      active_status: {
        closed: {
          isActive: false,
          timeStamp: null,
        },
        sourcing: {
          isActive: false,
          timeStamp: null,
        },
        interviewing: {
          isActive: true,
          timeStamp: null,
        },
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

export const splitFullName = (name: string) => {
  const nameParts = name.trim().split(' ');

  if (nameParts.length === 1) {
    // If there is only one word, consider it as the first name and no last name
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  } else {
    // If there are multiple words, the last word is the last name, and the rest are the first name
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');
    return {
      firstName,
      lastName,
    };
  }
};

export const POSTED_BY = {
  LEVER: 'Lever',
  AGLINT: 'Aglint',
};
