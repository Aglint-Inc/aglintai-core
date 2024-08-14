import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

export const useAllIntegrations = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const queryKey = ['intergrations_company'];
  const response = useQuery({
    queryKey,
    queryFn: () => getIntegrations(recruiter_id),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

const getIntegrations = async (recruiter_id: string) => {
  return (
    await supabase
      .from('integrations')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data;
};
