import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { companyMembersKeys } from './keys';

export const useCompanyMembers = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = companyMembersKeys.filterWithRecruiterId({
    recruiter_id,
  });
  const response = useQuery({
    queryKey,
    queryFn: () => getCompanyMembers({ recruiter_id }),
    enabled: !!recruiter_id,
    gcTime: 0,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const interviewPlanRecruiterUserQuery =
  'user_id, email, profile_image,first_name,last_name, position, department' as const;

export const getCompanyMembers = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const { data, error } = await supabase
    .from('recruiter_relation')
    .select(
      `recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery})`,
    )
    .eq('recruiter_id', recruiter_id)
    .eq('recruiter_user.join_status', 'joined');
  if (error) throw new Error(error.message);
  return data.map(({ recruiter_user }) => recruiter_user).filter((v) => v);
};
