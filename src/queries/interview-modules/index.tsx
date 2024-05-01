import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { interviewPlanRecruiterUserQuery } from '../company-members';
import { interviewModuleKeys } from './keys';

export const useInterviewModules = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const { queryKey } = interviewModuleKeys.interview_module;
  const response = useQuery({
    queryKey,
    queryFn: () => getInterviewModules(recruiter_id),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const getInterviewModules = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('interview_module')
    .select(
      `*, interview_module_relation(id, training_status, recruiter_user(${interviewPlanRecruiterUserQuery}))`,
    )
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data.map(({ interview_module_relation, ...rest }) => {
    const members = interview_module_relation.map(
      ({ recruiter_user, id, training_status }) => ({
        ...recruiter_user,
        moduleUserId: id,
        training_status,
      }),
    );
    return { ...rest, members };
  });
};
