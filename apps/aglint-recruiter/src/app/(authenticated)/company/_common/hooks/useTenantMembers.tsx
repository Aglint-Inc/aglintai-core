import { api } from '@/trpc/client';

export const useTenantMembers = () => {
  const query = api.tenant.members.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10,
    placeholderData: [],
  });

  const allMembers = query?.data || [];
  const members = allMembers.filter((member) => member.status === 'active');

  return {
    allMembers,
    refetchMembers: query.refetch,
    members,
    isFetched: query.isFetched,
    isLoading: query.isLoading,
  };
};

export type TenantMembersType = ReturnType<typeof useTenantMembers>;
