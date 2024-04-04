import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { interviewCoordinatorKeys } from './keys';

export const useInterviewCoordinators = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = interviewCoordinatorKeys.all;
  const response = useQuery({
    queryKey,
    queryFn: () => getInterviewCoordinators(recruiter_id),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const interviewPlanRecruiterUserQuery =
  'user_id, email, profile_image,first_name,last_name, position, department' as const;

export const getInterviewCoordinators = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('recruiter_relation')
    .select(`recruiter_user!inner(${interviewPlanRecruiterUserQuery})`)
    .eq('recruiter_id', recruiter_id)
    .eq('recruiter_user.join_status', 'joined');
  if (error) throw new Error(error.message);
  return data.map(({ recruiter_user }) => recruiter_user);
};
