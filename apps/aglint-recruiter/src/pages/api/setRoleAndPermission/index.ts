import { DatabaseTable, DB } from '@aglint/shared-types';
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
      const { recruiter_id, user_id } = requesterDetails;
      const { add, delete: toDelete, role_id } = body;
      const roleMeta = await checkRole(role_id);

      if (!roleMeta || (roleMeta.role === 'auth' && roleMeta.id !== user_id))
        throw new Error('Cannot alter admin role.');
      if (!(add || toDelete))
        throw new Error('No permission added or deleted is required');
      const permission_dependency = await getPermissions({
        ids: add,
        rel_ids: toDelete,
      });

      if (toDelete && permission_dependency) {
        const toDeleteArray = [
          permission_dependency.id,
          ...(permission_dependency?.meta?.dependency_tree?.child || []),
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
          ...(permission_dependency?.meta?.dependency_tree?.child || []),
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

const checkRole = async (role_id: string) => {
  return supabase
    .from('roles')
    .select('name, recruiter(primary_admin)')
    .eq('id', role_id)
    .throwOnError()
    .single()
    .then(({ data }) => ({
      role: data.name,
      id: data.recruiter.primary_admin,
    }));
};

const getPermissions = async ({
  ids,
  rel_ids,
}: {
  ids: number;
  rel_ids: string;
}) => {
  let permissions: (DatabaseTable['permissions'] & {
    role_permissions_id: string;
  })[];
  if (ids) {
    permissions = (
      await supabase
        .from('permissions')
        .select('*')
        .eq('is_enable', true)
        // .eq('id', ids)
        // .single()
        .throwOnError()
    ).data.map((permission) => ({
      ...permission,
      role_permissions_id: null,
    }));
  } else {
    permissions = (
      await supabase
        .from('permissions')
        .select('*,role_permissions(id)')
        .eq('is_enable', true)
        .eq('role_permissions.id', rel_ids)
        .throwOnError()
    ).data.map((permission) => ({
      ...permission,
      role_permissions: undefined,
      role_permissions_id: permission.role_permissions?.[0]?.id,
    }));
  }
  // const permissionSet = new Set<string>();
  const temp_permissions = permissions.find((pre) =>
    ids ? pre.id == ids : Boolean(pre.role_permissions_id),
  );
  if (temp_permissions.meta?.dependency_tree?.child.length)
    // @ts-ignore
    temp_permissions.meta.dependency_tree.child =
      temp_permissions.meta.dependency_tree.child.map(
        (item) => permissions.find((per) => per.name === item)?.id,
      );
  return temp_permissions;
};
