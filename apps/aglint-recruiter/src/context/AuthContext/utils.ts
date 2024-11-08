import {
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';

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
