import { useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export const useAllMembers = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();

  const query = api.get_members_with_role.useQuery(undefined, {
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
  const members = allMembers.filter((member) => member.status === 'active');

  return {
    allMembers,
    refetchMembers,
    members,
    isLoading: query.isLoading,
  };
};
