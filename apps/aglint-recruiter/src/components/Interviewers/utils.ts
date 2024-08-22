import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export type useAllInterviewerType = Awaited<
  ReturnType<typeof useAllInterviewer>
>;

export function useAllInterviewer(recruiter_id: string) {
  return useQuery({
    queryKey: ['recruiter_id', recruiter_id],
    queryFn: () => fetchFunction(recruiter_id),
    enabled: Boolean(recruiter_id),
  });
}

const fetchFunction = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('all_interviewers')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);

  return data;
};
