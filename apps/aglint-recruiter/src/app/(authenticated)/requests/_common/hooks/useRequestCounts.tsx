/* eslint-disable security/detect-object-injection */
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

export const useRequestCounts = () => {
  const { recruiter_user } = useTenant();
  const user_id = recruiter_user?.user_id ?? '';
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_request'],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getRequestsList({ assigner_id: user_id }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_request'] });
  return { ...query, refetch };
};

export async function getRequestsList({
  assigner_id,
}: {
  assigner_id: string;
}) {
  const data = await supabase
    .rpc('get_request_count_stats', {
      assigner_id: assigner_id,
    })
    .select()
    .throwOnError();

  return data;
}
