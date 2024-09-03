import { type DatabaseTable, type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { jwtVerify } from 'jose';

import { type EventSessionType } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export const server_check_permissions = async ({
  getVal,
  permissions,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  permissions: DatabaseTable['permissions']['name'][];
}) => {
  try {
    if (!permissions?.length) throw new Error('Permission not provided.');
    // @ts-ignore
    const jsonDetail = getToken(supabase.storageKey, getVal);

    const user_id = jsonDetail.user.id;
    const token = jsonDetail.access_token;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SUPABASE_SECRET_KEY!),
    );

    const tokenData = payload as unknown as EventSessionType;
    const userPermissions = tokenData.app_metadata.role_permissions.permissions;
    const role = tokenData.app_metadata.role_permissions.role;
    const rec_id = tokenData.app_metadata.role_permissions.recruiter_id;
    let is_allowed = permissions.includes('authorized');

    for (let permission of permissions) {
      if (userPermissions.includes(permission)) {
        is_allowed = true;
        break;
      }
    }
    return {
      isAllowed: is_allowed,
      id: user_id,
      rec_id,
      role,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { isAllowed: false, id: null, rec_id: null, role: null };
  }
};

function getToken(base: string, func: Function) {
  let tryNext = true;
  let count = 0;
  let jsonData: {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: { id: string };
  } = null;
  let tempData: string[] = [func(base)];
  while (tryNext) {
    const temp = func(`${base}.${count}`);
    if (!temp) {
      break;
    }
    tempData.push(temp);
    count++;
  }
  tempData = tempData.filter((item) => Boolean(item));
  try {
    jsonData = JSON.parse(atob(tempData.join('').replace('base64-', ''))) as {
      access_token: string;
      token_type: string;
      expires_in: number;
      expires_at: number;
      refresh_token: string;
      user: { id: string };
    };
  } catch (error) {
    console.error(error);
    throw new Error('failed to load session');
  }
  // (new Date(1721397061*1000) - new Date())/(1000*60) < .3 && throw new Error('Access token Expired') //  reject
  return jsonData;
}
