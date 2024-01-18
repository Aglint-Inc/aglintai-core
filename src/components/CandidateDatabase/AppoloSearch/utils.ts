import { AglintCandidatesTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { CandidateSearchHistoryType } from './types';

export const employeeRange = [
  { value: '10001', show: '10001+' },
  { value: '5001,10000', show: '5001-10000' },
  { value: '2001,5000', show: '2001-5000' },
  { value: '1001,2000', show: '1001-2000' },
  { value: '501,1000', show: '501-1000' },
  { value: '201,500', show: '201-500' },
  { value: '101,200', show: '101-200' },
  { value: '51,100', show: '51-100' },
  { value: '21,50', show: '21-50' },
  { value: '11,20', show: '11-20' },
  { value: '1,10', show: '1-10' },
];

export const initialQuery = () => {
  return {
    companies: [],
    jobTitles: [],
    locations: [],
    companySize: '',
  };
};

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

export const updateCredits = async (his: CandidateSearchHistoryType) => {
  const { error } = await supabase
    .from('candidate_search_history')
    .update({ credits_used: his.credits_used + 1 })
    .eq('id', 1);
  if (error) {
    toast.error(error.message);
  }
  return true;
};
