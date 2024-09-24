import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { type GreenHouseUserSyncAPI } from '@/api/sync/greenhouse/user/type';
import axios from '@/client/axios';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type API_get_last_login } from '@/pages/api/get_last_login/types';
import { useGreenhouseDetails } from '@/queries/greenhouse';
import { useAllMembers } from '@/queries/members';

export const useTeamMembers = () => {
  const { recruiter } = useAuthDetails();

  const { allMembers, members, refetchMembers } = useAllMembers();
  const {
    data: syncData,
    isPending,
    refetch: refetchLastSync,
  } = useGreenhouseDetails();

  const activeMembers = members;

  const query = useQuery({
    queryKey: ['TeamMembers'],
    queryFn: () => {
      return getLastLogins(
        allMembers.map((item) => item.user_id),
        recruiter.id,
      ).then((data) => {
        return allMembers.map((member) => {
          return { ...member, last_login: data[member.user_id] };
        });
      });
    },
    placeholderData: [],
    enabled: Boolean(allMembers?.length),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  async function sync_users() {
    syncUsers(recruiter.id, syncData?.key, syncData?.last_sync['users']).then(
      () => {
        refetchMembers();
        refetchLastSync();
      },
    );
  }

  useEffect(() => {
    if (query.data && allMembers.length) {
      query.refetch();
    }
  }, [allMembers.length, query.refetch]);
  return {
    activeMembers,
    ...query,
    isPending: query.isPending || isPending,
    remote_sync: {
      lastSync: syncData?.last_sync['users'],
      isEnabled: Boolean(syncData?.key),
      sync: sync_users,
    },
    refetchMembers, // Add this line
  };
};

const getLastLogins = (ids: string[], recruiter_id: string) => {
  const body: API_get_last_login['request'] = { ids, recruiter_id };
  return axios
    .post<API_get_last_login['response']>('/api/get_last_login', body)
    .then(({ data: { data, error } }) => {
      if (error) throw new Error(error);
      const tempData: { [key: string]: string } = {};
      data.forEach((item) => {
        tempData[item.id] = item.last_login;
      });
      return tempData;
    });
};

async function syncUsers(
  recruiter_id: string,
  key: string,
  last_sync?: string,
) {
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
