import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type CompanyMembersAPI } from '@/pages/api/scheduling/fetchUserDetails';

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

const getCompanyMembers = async ({
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
  | 'role'
  | 'office_locations'
  | 'departments'
  | 'role_id'
  | 'manager_id'
  | 'created_by'
>;
