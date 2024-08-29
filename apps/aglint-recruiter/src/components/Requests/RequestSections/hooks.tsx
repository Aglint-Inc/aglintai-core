import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useRequestWorkflow = ({
  request_id,
  enabled,
}: {
  request_id: string;
  enabled?: boolean;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_request_workflow'],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getRequestWorkFlow({ request_id }),
    gcTime: 20000,
    enabled: !!request_id && !!enabled,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_request_workflow'] });
  return { ...query, refetch };
};

export async function getRequestWorkFlow({
  request_id,
}: {
  request_id: string;
}) {
  return (
    await supabase
      .from('workflow')
      .select('*, workflow_action(*)')
      .eq('request_id', request_id)
      .throwOnError()
  ).data;
}
