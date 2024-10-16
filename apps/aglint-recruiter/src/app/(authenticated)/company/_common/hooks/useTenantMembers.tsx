import type { Members } from '@/routers/tenant/members';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useTenantMembers = () => {
  const query = useProcedure();
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

const useProcedure = (): ProcedureQuery<Members> =>
  api.tenant.members.useQuery(undefined, {
    refetchInterval: 1000 * 60 * 10,
  });
