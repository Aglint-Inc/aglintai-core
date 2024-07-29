import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

export const useAllDepartments = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const recruiter_id = recruiter?.id;
  const query = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchDepartments(recruiter_id),
    enabled: !!recruiter_id,
    refetchInterval: 1000 * 60 * 10,
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['departments'],
    });
  };
  return { ...query, refetch };
};

const fetchDepartments = async (rec_id: string) => {
  const { data } = await supabase
    .from('departments')
    .select('*')
    .eq('recruiter_id', rec_id)
    .throwOnError();

  return data;
};
