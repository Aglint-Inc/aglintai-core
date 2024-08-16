import {
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
  RecruiterDB,
} from '@aglint/shared-types';

import axios from '@/src/client/axios';
import { GetUserDetailsAPI } from '@/src/pages/api/getUserDetails/type';
import { API_setMembersWithRole } from '@/src/pages/api/setMembersWithRole/type';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';




export const fetchUserLocation = async () => {
  try {
    const res = await fetch('https://ipinfo.io/json', {
      headers: {
        Authorization: `Bearer e82b96e5cb0802`,
      },
    });
    const data = await res.json();
    const country = data.country;
    return country?.toLowerCase() ?? 'us';
  } catch (error) {
    //
  }
};

export const isRoutePublic = (path = '') => {
  const whiteListedRoutes = [ROUTES['/login'](), ROUTES['/signup']()];
  for (const route of whiteListedRoutes) {
    if (path.startsWith(route)) {
      return true;
    }
  }
};

export async function getUserDetails() {
  return axios.call<GetUserDetailsAPI>('GET', '/api/getUserDetails', {});
}

export const updateRecruiterInDb = async (
  updateData: Partial<RecruiterDB>,
  id: string,
) => {
  const { data, error } = await supabase
    .from('recruiter')
    .update(updateData)
    .eq('id', id)
    .select();
  if (!error && data.length) {
    delete data[0].socials;
    return data[0] as Omit<RecruiterDB, 'address' | 'socials'>;
  }
  return null;
};

export const handleUpdatePassword = async (
  password: string,
): Promise<{
  error: boolean;
  message: string;
}> => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  } else {
    return {
      error: false,
      message: 'Password reset successfully',
    };
  }
};

export const refershAccessToken = async ({ refresh_token }) => {
  await supabase.auth.refreshSession({
    refresh_token: refresh_token,
  });
};

export const updateJoinedStatus = async (user_id: string) => {
  await supabase
    .from('recruiter_user')
    .update({ status: 'active' })
    .eq('user_id', user_id)
    .throwOnError();
};

export const updateMember = ({
  data,
}: {
  data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
    user_id: string;
    role_id?: string;
    manager_id?: string;
  };
}) => {
  return axios
    .call<API_setMembersWithRole>('POST', '/api/setMembersWithRole', {
      data,
    })
    .then((res) => res.data);
};

export const manageOfficeLocation = async (
  payload:
    | { type: 'insert'; data: DatabaseTableInsert['office_locations'] }
    | { type: 'delete'; data: number }
    | { type: 'update'; data: DatabaseTableUpdate['office_locations'] },
) => {
  const query = supabase.from('office_locations');
  switch (payload.type) {
    case 'insert': {
      await query.insert(payload.data).single().throwOnError();
      break;
    }
    case 'update': {
      await query
        .update(payload.data)
        .eq('id', payload.data.id)
        .single()
        .throwOnError();
      break;
    }
    case 'delete': {
      await query.delete().eq('id', payload.data).throwOnError();
      break;
    }
  }
  return true;
};

export const manageDepartments = async (
  payload:
    | { type: 'insert'; data: DatabaseTableInsert['departments'][] }
    | { type: 'delete'; data: number[] }
    | { type: 'update'; data: DatabaseTable['departments'][] },
) => {
  const query = supabase.from('departments');
  switch (payload.type) {
    case 'insert': {
      await query.insert(payload.data).throwOnError();
      break;
    }
    case 'update': {
      await query.upsert(payload.data, { onConflict: 'id' }).throwOnError();

      break;
    }
    case 'delete': {
      await query.delete().in('id', payload.data).throwOnError();
      break;
    }
  }
  return true;
};
