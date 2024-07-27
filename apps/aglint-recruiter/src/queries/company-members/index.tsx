import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CompanyMembersAPI } from '@/src/pages/api/scheduling/fetchUserDetails';

import { companyMembersKeys } from './keys';

export const useCompanyMembers = () => {
  const queryClient = useQueryClient();
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = companyMembersKeys.companyMembers();
  const response = useQuery({
    queryKey,
    queryFn: () => getCompanyMembers({ recruiter_id }),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const getCompanyMembers = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const res = await axios.post('/api/scheduling/fetchUserDetails', {
    recruiter_id,
  });
  const allUsers = (res.data as unknown as CompanyMembersAPI) || [];
  return allUsers;
};

export type CompanyMember = Omit<
  CompanyMembersAPI[number],
  'role' | 'office_locations' | 'departments'
>;
