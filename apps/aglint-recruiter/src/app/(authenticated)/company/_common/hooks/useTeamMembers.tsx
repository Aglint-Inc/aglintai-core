import { useTenant, useTenantMembers } from '@/company/hooks';
import { type GetLastLogin } from '@/routers/get_last_login';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import toast from '@/utils/toast';

export const useTeamMembersLastLogin = () => {
  const query = useGetLastLogin();
  return {
    ...query,
    data: query.data || {},
    isPending: query.isPending,
  };
};

const useGetLastLogin = (): ProcedureQuery<GetLastLogin> => {
  const { allMembers } = useTenantMembers();
  const ids = allMembers.map((item) => item.user_id);
  return api.get_last_login.useQuery(
    { ids },
    {
      enabled: Boolean(allMembers?.length),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
};

export function useUserSync() {
  const apiUtils = api.useUtils();
  const { recruiter: tempRecruiter } = useTenant();
  const recruiter = tempRecruiter!;
  const { mutateAsync: syncUsers } = api.ats.greenhouse.users.useMutation();
  async function sync_users() {
    syncUsers({ recruiter_id: recruiter.id }).then(() => {
      apiUtils.tenant.members.invalidate();
      apiUtils.get_last_login.invalidate();
    });
  }
  return { sync_users };
}

export function useCancelInvite() {
  const apiUtils = api.useUtils();
  const { mutateAsync: cancelInvite } = api.tenant['cancel-invite'].useMutation(
    {
      onMutate: async (input) => {
        await apiUtils.tenant.members.cancel();
        const prevData = apiUtils.tenant.members.getData();
        apiUtils.tenant.members.setQueriesData(undefined, {}, (pre) => {
          return (pre || []).filter((item) => {
            return item.user_id !== input.user_id;
          });
        });
        return { prevData };
      },
      onSuccess() {
        apiUtils.tenant.members.invalidate();
        toast.success('Updated successfully');
      },
      onError: (error, _data, context) => {
        toast.error(String(error));
        apiUtils.tenant.members.setData(undefined, context?.prevData);
      },
    },
  );
  return { cancelInvite };
}
