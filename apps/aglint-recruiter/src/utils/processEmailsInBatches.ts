import { type DatabaseTable, type SupabaseType } from '@aglint/shared-types';

import { supabase } from './supabase/client';

const MAX_EMAILS_PER_BATCH = 100; // adjust this number based on your requirements

const processBatch = async (
  emailBatch: string[],
  recruiter_id: string,
  supabaseCaller = supabase,
) => {
  return (
    await supabaseCaller
      .from('candidates')
      .select()
      .in('email', emailBatch)
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;
};

export const processEmailsInBatches = async (
  emails: string[],
  recruiter_id: string,
  supabaseCaller: SupabaseType,
): Promise<DatabaseTable['candidates'][] | undefined> => {
  let allCandidates: DatabaseTable['candidates'][] = [];
  for (let i = 0; i < emails.length; i += MAX_EMAILS_PER_BATCH) {
    const emailBatch = emails.slice(i, i + MAX_EMAILS_PER_BATCH);
    const cand =
      (await processBatch(emailBatch, recruiter_id, supabaseCaller)) || [];
    allCandidates = [...allCandidates, ...cand];
  }
  return allCandidates;
};
