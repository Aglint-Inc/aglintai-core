import { DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { SetRoleAndPermissionAPI } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<SetRoleAndPermissionAPI>(
    req,
    res,
  );
  requestHandler(
    'POST',
    async ({ requesterDetails, body }) => {
      const { recruiter_id } = requesterDetails;
      const { add, delete: toDelete, role_id } = body;

      if (!(add || toDelete))
        throw new Error('No permission added or deleted is required');
      if (toDelete) {
        await supabase.from('role_permissions').delete().eq('id', toDelete);
      }
      let temp_added: SetRoleAndPermissionAPI['response']['addedPermissions'] =
        null;
      if (add) {
        const { data } = await supabase
          .from('role_permissions')
          .insert({ recruiter_id, permission_id: add, role_id })
          .select('id, permission_id')
          .single()
          .throwOnError();
        temp_added = {
          id: data.permission_id,
          relation_id: data.id,
        };
      }
      return { success: true, addedPermissions: temp_added };
    },
    ['role_id'],
  );
}
