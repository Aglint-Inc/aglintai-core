import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useTenant } from '@/company/hooks';
import {
  type BodyParamsFetchUserDetails,
  type CompanyMembersAPI,
} from '@/pages/api/scheduling/fetchUserDetails';

export const useMemberList = () => {
  const { recruiter_id } = useTenant();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_members_list', recruiter_id],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getMembersList({ recruiter_id }),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_members_list', recruiter_id],
    });
  return { ...query, refetch };
};

type MemberType = CompanyMembersAPI[number];
const getMembersList = async ({ recruiter_id }: { recruiter_id: string }) => {
  const bodyParams: BodyParamsFetchUserDetails = {
    recruiter_id: recruiter_id,
    includeSupended: true,
  };
  const resMem = (await axios.post(
    '/api/scheduling/fetchUserDetails',
    bodyParams,
  )) as { data: MemberType[] };

  return resMem.data;
};
