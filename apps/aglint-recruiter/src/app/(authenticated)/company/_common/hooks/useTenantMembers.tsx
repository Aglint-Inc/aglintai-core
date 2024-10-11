import { api } from '@/trpc/client';

export const useTenantMembers = () => {
  const query = api.tenant.members.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10,
  });
  const allMembers = query?.data || [];
  const members = allMembers.filter((member) => member.status === 'active');

  return {
    ...query,
    data: query.data || [],
    allMembers,
    members,
  };
};

export type TenantMembersType = ReturnType<typeof useTenantMembers>;
