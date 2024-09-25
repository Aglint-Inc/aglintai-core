import { useMemo } from 'react';

import { type GreenHouseUserSyncAPI } from '@/api/sync/greenhouse/user/type';
import axios from '@/client/axios';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useGreenhouseDetails } from '@/queries/greenhouse';
import { useAllMembers } from '@/queries/members';
import { api } from '@/trpc/client';

export const useTeamMembers = () => {
  const { recruiter: tempRecruiter } = useAuthDetails();
  const recruiter = tempRecruiter!;

  const { allMembers, members, refetchMembers } = useAllMembers();
  const {
    data: syncData,
    isPending,
    refetch: refetchLastSync,
  } = useGreenhouseDetails();

  const activeMembers = members;
  const ids = allMembers.map((item) => item.user_id);
  const query = api.get_last_login.useQuery(
    { ids },
    {
      enabled: Boolean(allMembers?.length),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  async function sync_users() {
    syncUsers(recruiter.id, syncData?.key, syncData?.last_sync['users']).then(
      () => {
        refetchMembers();
        refetchLastSync();
      },
    );
  }

  const data = useMemo(() => {
    if (query.data) {
      return allMembers.map((member) => {
        return {
          ...member,
          last_login: (query.data || {})[member.user_id],
        };
      });
    }
    return [];
  }, [query.data]);
  return {
    activeMembers,
    ...query,
    data,
    isPending: query.isPending || isPending,
    remote_sync: {
      lastSync: syncData?.last_sync['users'],
      isEnabled: Boolean(syncData?.key),
      sync: sync_users,
    },
    refetchMembers, // Add this line
  };
};

async function syncUsers(
  recruiter_id: string,
  key: string | null,
  last_sync?: string,
) {
  if (key) {
    return await axios.call<GreenHouseUserSyncAPI>(
      'POST',
      `/api/sync/greenhouse/user`,
      {
        recruiter_id,
        key,
        last_sync,
      },
    );
  }
}
