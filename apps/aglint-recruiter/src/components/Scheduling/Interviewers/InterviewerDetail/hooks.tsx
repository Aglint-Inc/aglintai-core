import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useImrQuery = ({ user_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['interviewer_details', user_id];
  const query = useQuery({
    queryKey: ['interviewer_details', user_id],
    queryFn: () => getInterviewerDetails(user_id),
    enabled: !!user_id,
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

export const useModuleRelations = ({ user_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['interviewer_module_relations', user_id];
  const query = useQuery({
    queryKey,
    queryFn: () => getModuleRelations(user_id),
    enabled: !!user_id,
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

const getInterviewerDetails = async (user_id: string) => {
  return (
    await supabase
      .from('recruiter_user')
      .select('*')
      .eq('user_id', user_id)
      .single()
  ).data;
};

const getModuleRelations = async (user_id: string) => {
  return (
    await supabase
      .from('module_relations_view')
      .select('*')
      .eq('user_id', user_id)
  ).data;
};
