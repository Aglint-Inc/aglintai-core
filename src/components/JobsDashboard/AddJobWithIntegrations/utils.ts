import axios from 'axios';

import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

export const createJobApplications = async (selectedLeverPostings) => {
  const applications = await Promise.all(
    selectedLeverPostings.map(async (post) => {
      const allCandidates = await fetchAllCandidates(post.id);
      const dbCandidates = allCandidates.map((cand) => {
        return {
          first_name: splitFullName(cand.name).firstName,
          last_name: splitFullName(cand.name).lastName,
          email: cand.emails[0],
          linkedin: cand.links[0],
          phone: cand.phones[0]?.value,
          job_id: post.id,
        };
      });

      const { data, error } = await supabase
        .from('job_applications')
        .insert(dbCandidates)
        .select();

      if (!error) {
        const referenceObj = data.map((app) => {
          return {
            application_id: app.application_id,
            posting_id: app.job_id,
            opportunity_id: allCandidates.filter(
              (cand) => cand.emails[0] == app.email,
            )[0].id,
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

const createLeverReference = async (reference) => {
  const { error } = await supabase
    .from('lever_reference')
    .insert(reference)
    .select();

  if (error) {
    toast.error(
      'Sorry unable to import. Please try again later or contact support.',
    );
  }
};

const fetchAllCandidates = async (post_id) => {
  let allCandidates = [];
  let hasMore = true;
  let next = 0;

  while (hasMore) {
    try {
      const response = await axios.post('/api/lever/getCandidates', {
        posting_id: post_id,
        offset: next,
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
