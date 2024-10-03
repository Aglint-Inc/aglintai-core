import { supabase } from '@/utils/supabase/client';

export const fetchJobs = (recruiter_id: string) => {
  return supabase
    .from('public_jobs')
    .select()
    .order('created_at', { ascending: false })
    .eq('recruiter_id', recruiter_id)
    .then(({ data, error }) => {
      if (!error) {
        return data;
      } else {
        return [];
      }
    });
};
