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
      if (await checkRole(role_id)) throw new Error('Cannot alter admin role.');
      if (!(add || toDelete))
        throw new Error('No permission added or deleted is required');
      const permission_dependency = await getPermissions({
        ids: add,
        rel_ids: toDelete,
      });

      if (toDelete && permission_dependency) {
        const toDeleteArray = [
          permission_dependency.id,
          ...(permission_dependency?.dependency_tree?.child || []),
        ];
        await supabase
          .from('role_permissions')
          .delete()
          .eq('role_id', role_id)
          .in('permission_id', toDeleteArray)
          .throwOnError();
      }
      let temp_added: SetRoleAndPermissionAPI['response']['addedPermissions'] =
        null;

      if (add && permission_dependency) {
        const toAddArray = [
          permission_dependency.id,
          ...(permission_dependency?.dependency_tree?.child || []),
        ].map((pId) => ({ recruiter_id, permission_id: Number(pId), role_id }));
        const { data } = await supabase
          .from('role_permissions')
          .insert(toAddArray)
          .select('id, permission_id')
          .throwOnError();
        temp_added = data.map((data) => ({
          id: data.permission_id,
          relation_id: data.id,
        }));
      }
      return { success: true, addedPermissions: temp_added };
    },
    ['role_id'],
  );
}

const checkRole = (role_id: string) => {
  return supabase
    .from('roles')
    .select('name')
    .eq('id', role_id)
    .throwOnError()
    .single()
    .then(({ data }) => data.name === 'admin');
};
const getPermissions = async ({
  ids,
  rel_ids,
}: {
  ids: number;
  rel_ids: string;
}) => {
  if (ids)
    return (
      await supabase
        .from('permissions')
        .select('*')
        .eq('is_enable', true)
        .eq('id', ids)
        .single()
        .throwOnError()
    ).data;
  return (
    await supabase
      .from('role_permissions')
      .select('permissions(*)')
      .eq('permissions.is_enable', true)
      .eq('id', rel_ids)
      .single()
      .throwOnError()
  ).data?.permissions;
};
