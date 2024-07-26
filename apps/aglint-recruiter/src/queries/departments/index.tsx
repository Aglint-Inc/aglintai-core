import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useAllDepartments = (rec_id: string) => {
  const query = useQuery({
    queryKey: ['departments', { rec_id }],
    queryFn: () => fetchDepartments(rec_id),
    enabled: !!rec_id,
  });

  return query;
};

const fetchDepartments = async (rec_id: string) => {
  const { data } = await supabase
    .from('departments')
    .select('*')
    .eq('recruiter_id', rec_id)
    .throwOnError();

  return data;
};
