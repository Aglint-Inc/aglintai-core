import { type AglintCandidatesTypeDB } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { type EmploymentHistory, type FetchCandidatesParams, type UsedCredits } from './types';

export const employeeRange = [
  {
    value: 'owner',
    display_name: 'Owner',
  },
  {
    value: 'founder',
    display_name: 'Founder',
  },
  {
    value: 'c_suite',
    display_name: 'C Suite',
  },
  {
    value: 'partner',
    display_name: 'Partner',
  },
  {
    value: 'vp',
    display_name: 'VP',
  },
  {
    value: 'head',
    display_name: 'Head',
  },
  {
    value: 'director',
    display_name: 'Director',
  },
  {
    value: 'manager',
    display_name: 'Manager',
  },
  {
    value: 'senior',
    display_name: 'Senior',
  },
  {
    value: 'entry',
    display_name: 'Entry',
  },
  {
    value: 'intern',
    display_name: 'Intern',
  },
];

export const initialQuery = () => {
  return {
    companies: [],
    pagination: {
      page: 1,
      per_page: 25,
      total_pages: 0,
      total_entries: 0,
    },
    person_titles: [],
    organization_ids: [],
    person_locations: [],
    person_seniorities: [],
  } as FetchCandidatesParams;
};

export function calculateTotalExperience(
  employmentHistory: EmploymentHistory[],
): number {
  try {
    const currentDate = new Date();
    let oldestStartDate = currentDate; // Initialize with current date

    // Find the oldest start date
    employmentHistory.forEach((job) => {
      const startDate = job.start_date ? new Date(job.start_date) : null;
      if (startDate && startDate < oldestStartDate) {
        oldestStartDate = startDate;
      }
    });

    // Calculate the total experience in milliseconds
    const totalExperienceInMs: number = oldestStartDate
      ? currentDate.getTime() - oldestStartDate.getTime()
      : 0;

    // Convert milliseconds to years
    const totalExperienceInYears: number =
      totalExperienceInMs / (365 * 24 * 60 * 60 * 1000);

    // Round to two decimal places
    return Math.floor(Math.round(totalExperienceInYears * 100) / 100);
  } catch (e) {
    return 0;
  }
}

export const processCandidatesInBatches = async (
  ids: string[],
): Promise<AglintCandidatesTypeDB[] | null> => {
  let allCandidates = [];
  for (let i = 0; i < ids.length; i += MAX_EMAILS_PER_BATCH) {
    const idsBatch = ids.slice(i, i + MAX_EMAILS_PER_BATCH);
    const cand = await processBatch(idsBatch);
    allCandidates = [...allCandidates, ...cand];
  }
  return allCandidates || [];
};

const MAX_EMAILS_PER_BATCH = 100; // adjust this number based on your requirements

const processBatch = async (
  ids: string[],
): Promise<AglintCandidatesTypeDB[]> => {
  const { data: checkCandidates, error: errorCheck } = await supabase
    .from('aglint_candidates')
    .select('*')
    .in('id', ids);

  if (!errorCheck) {
    return checkCandidates;
  } else {
    return [];
  }
};

export const updateCredits = async (used_credits: UsedCredits, id: number) => {
  const { error } = await supabase
    .from('candidate_search_history')
    .update({ used_credits: used_credits as any })
    .eq('id', id);
  if (error) {
    toast.error(error.message);
  }
  return true;
};
