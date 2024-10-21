import type { DatabaseTable } from '@aglint/shared-types';
import { z } from 'zod';

import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const body = z.object({
  delete: z.string().nullable(),
  add: z.number().nullable(),
  role_id: z.string(),
});

export const post = privateProcedure
  .input(body)
  .mutation(async ({ ctx: { user_id, recruiter_id }, input }) => {
    const { add, delete: toDelete, role_id } = input;
    const db = createPublicClient();
    const roleMeta = await checkRole(db, role_id);
    if (!roleMeta || (roleMeta.role === 'auth' && roleMeta.id !== user_id))
      throw new Error('Cannot alter admin role.');
    if (!(add || toDelete))
      throw new Error('No permission added or deleted is required');
    const permission_dependency = await getPermissions(db, {
      ids: add,
      rel_id: toDelete,
    });

    if (toDelete && permission_dependency) {
      const toDeleteArray = [
        permission_dependency.id,
        ...(permission_dependency?.meta?.dependency_tree?.child || []),
      ];
      await db
        .from('role_permissions')
        .delete()
        .eq('role_id', role_id)
        .in('permission_id', toDeleteArray)
        .throwOnError();
    }

    let temp_added:
      | {
          relation_id: string;
          id: number;
        }[]
      | null = null;

    if (add && permission_dependency) {
      const toAddArray = [
        permission_dependency.id,
        ...(permission_dependency?.meta?.dependency_tree?.child || []),
      ].map((pId) => ({ recruiter_id, permission_id: Number(pId), role_id }));

      const data = (
        await db
          .from('role_permissions')
          .insert(toAddArray)
          .select('id, permission_id')
          .throwOnError()
      ).data!;
      temp_added =
        data.map((data) => ({
          id: data.permission_id,
          relation_id: data.id,
        })) || [];
    }
    return { success: true, addedPermissions: temp_added! };
  });

export type Post = ProcedureDefinition<typeof post>;

const checkRole = async (supabase: SupabaseClientType, role_id: string) => {
  const data = (
    await supabase
      .from('roles')
      .select('name, recruiter(primary_admin)')
      .eq('id', role_id)
      .throwOnError()
      .single()
  ).data!;
  return {
    role: data.name,
    id: data.recruiter!.primary_admin,
  };
};

const getPermissions = async (
  supabase: SupabaseClientType,
  {
    ids,
    rel_id,
  }: {
    ids: number | null;
    rel_id: string | null;
  },
) => {
  let permissions: (DatabaseTable['permissions'] & {
    role_permissions_id: string | null;
  })[] = [];
  if (ids) {
    permissions = (
      await supabase
        .from('permissions')
        .select('*')
        .eq('is_enable', true)
        // .eq('id', ids)
        // .single()
        .throwOnError()
    ).data!.map((permission) => ({
      ...permission,
      role_permissions_id: null,
    }));
  } else if (rel_id) {
    permissions = (
      await supabase
        .from('permissions')
        .select('*,role_permissions(id)')
        .eq('is_enable', true)
        .eq('role_permissions.id', rel_id)
        .throwOnError()
    ).data!.map((permission) => ({
      ...permission,
      role_permissions: undefined,
      role_permissions_id: permission.role_permissions?.[0]?.id,
    }));
  }
  // const permissionSet = new Set<string>();
  const temp_permissions = permissions.find((pre) =>
    ids ? pre.id == ids : Boolean(pre.role_permissions_id),
  );
  if (temp_permissions?.meta?.dependency_tree?.child.length)
    // @ts-expect-error
    temp_permissions.meta.dependency_tree.child =
      temp_permissions.meta.dependency_tree.child.map(
        (item) => permissions.find((per) => per.name === item)?.id,
      );
  return temp_permissions;
};
