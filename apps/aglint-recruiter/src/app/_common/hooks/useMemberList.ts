import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useTenant } from '@/company/hooks';
import {
  type BodyParamsFetchUserDetails,
  type CompanyMembersAPI,
} from '@/pages/api/scheduling/fetchUserDetails';

export const useMemberList = (includeSupended = true, isCalendar = false) => {
  const { recruiter_id } = useTenant();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_members_list', recruiter_id, includeSupended, isCalendar],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () =>
      getMembersList({ recruiter_id, includeSupended, isCalendar }),
    enabled: !!recruiter_id,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_members_list', recruiter_id],
    });
  return { ...query, data: query?.data ?? [], refetch };
};

type MemberType = CompanyMembersAPI[number];
const getMembersList = async ({
  recruiter_id,
  includeSupended,
  isCalendar,
}: {
  recruiter_id: string;
  includeSupended: boolean;
  isCalendar: boolean;
}) => {
  const bodyParams: BodyParamsFetchUserDetails = {
    recruiter_id,
    includeSupended,
    isCalendar,
  };
  const resMem = (await axios.post(
    '/api/scheduling/fetchUserDetails',
    bodyParams,
  )) as { data: MemberType[] };

  return resMem.data;
};
