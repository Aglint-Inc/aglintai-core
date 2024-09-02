import { useQuery, useQueryClient } from '@tanstack/react-query';

import axios from '@/src/client/axios';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type API_getMembersWithRole } from '@/src/pages/api/getMembersWithRole/type';

export const useAllMembers = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers(),
    enabled: !!recruiter_id,
    refetchInterval: 1000 * 60 * 10,
    placeholderData: [],
  });

  const refetchMembers = () => {
    queryClient.invalidateQueries({
      queryKey: ['members'],
    });
  };

  const allMembers = query?.data || [];
  const members = query.data?.filter((member) => member.status === 'active');

  return {
    allMembers,
    refetchMembers,
    members,
    isLoading: query.isLoading,
  };
};

const getMembers = () => {
  return axios.call<API_getMembersWithRole>(
    'GET',
    '/api/getMembersWithRole',
    null,
  );
};
