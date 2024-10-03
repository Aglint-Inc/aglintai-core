import {
  type DatabaseTable,
  type DatabaseTableInsert,
  type DatabaseTableUpdate,
} from '@aglint/shared-types';

import axios from '@/client/axios';
import { type API_setMembersWithRole } from '@/pages/api/setMembersWithRole/type';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';

export const isRoutePublic = (path = '') => {
  const whiteListedRoutes = [ROUTES['/login'](), ROUTES['/signup']()];
  for (const route of whiteListedRoutes) {
    if (path?.startsWith(route)) {
      return true;
    }
  }
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
      if (payload.data.id) {
        await query
          .update(payload.data)
          .eq('id', payload.data.id)
          .single()
          .throwOnError();
      }
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
