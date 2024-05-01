import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiResponseFetchUserDetails } from '@/src/pages/api/scheduling/fetchUserDetails';

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
  const res = await axios.post('/api/scheduling/fetchUserDetails', {
    recruiter_id,
  });
  const allUsers =
    (res.data as unknown as Awaited<ApiResponseFetchUserDetails>) || [];
  return allUsers;
};
