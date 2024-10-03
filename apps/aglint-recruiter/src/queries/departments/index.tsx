import { useQuery } from '@tanstack/react-query';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

export const useAllDepartments = () => {
  const { recruiter } = useTenant();
  const recruiter_id = recruiter?.id;
  const query = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchDepartments(recruiter_id),
    enabled: !!recruiter_id,
    refetchInterval: 1000 * 60 * 10,
    placeholderData: [],
  });

  // const queryClient = useQueryClient();
  // const refetch = () => {
  //   queryClient.invalidateQueries({
  //     queryKey: ['departments'],
  //   });
  // };
  return { ...query, data: query.data || [], data: query.data! };
};

const fetchDepartments = async (rec_id: string) => {
  return (
    await supabase
      .from('departments')
      .select('*')
      .eq('recruiter_id', rec_id)
      .throwOnError()
  ).data!;
};
