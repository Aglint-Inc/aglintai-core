import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { RoleAndPermissionAPI } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<RoleAndPermissionAPI>(
    req,
    res,
  );
  requestHandler(
    'POST',
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { add, delete: toDelete, role_id } = body;
      if (toDelete.length) {
        await supabase.from('role_permissions').delete().in('id', toDelete);
      }
      let temp_added: RoleAndPermissionAPI['response']['addedPermissions'] = [];
      if (add.length) {
        const { data } = await supabase
          .from('role_permissions')
          .insert(
            add.map((item) => ({ recruiter_id, permission_id: item, role_id })),
          )
          .select('id, permission_id')
          .throwOnError();
        temp_added = data.map((item) => ({
          id: item.permission_id,
          relation_id: item.id,
        }));
      }
      return { success: true, addedPermissions: temp_added };
    },
    ['add', 'delete', 'role_id'],
  );
}
