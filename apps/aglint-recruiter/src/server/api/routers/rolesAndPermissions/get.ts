import type { DatabaseTable } from '@aglint/shared-types';

import { allPermissions } from '@/constant/role_and_permissions';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const query = async ({ ctx: { user_id, recruiter_id } }: PrivateProcedure) => {
  const db = createPublicClient();
  const result = await getRoleAndPermissionsWithUserCount(
    db,
    recruiter_id,
    user_id,
  );
  return result;
};

export const get = privateProcedure.query(query);

type rolesAndPermissions = {
  [roles: string]: {
    id: string;
    name: string;
    isEditable: boolean;
    assignedTo: string[];
    description: string | null;
    permissions: {
      relation_id: string | null;
      id: number;
      title: string | null;
      name: DatabaseTable['permissions']['name'] | null;
      description: string | null;
      meta: DatabaseTable['permissions']['meta'] | null;
      isActive: boolean;
    }[];
  };
};

async function getRoleAndPermissionsWithUserCount(
  supabase: SupabaseClientType,
  recruiter_id: string,
  user_id: string,
) {
  const rolesAndPermissionsDetails = await getRoleAndPermissions(
    supabase,
    recruiter_id,
    user_id,
  );
  const data = (
    await supabase
      .from('recruiter_relation')
      .select('role_id, user_id')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data!;
  // .then(({ data }) => {
  Object.keys(rolesAndPermissionsDetails.rolesAndPermissions).map((item) => {
    rolesAndPermissionsDetails.rolesAndPermissions[String(item)].assignedTo =
      data
        .filter(
          (di) =>
            di.role_id ==
            rolesAndPermissionsDetails.rolesAndPermissions[String(item)].id,
        )
        .map((item) => item.user_id) || [];
  });
  return rolesAndPermissionsDetails;
  // });
}

async function getRoleAndPermissions(
  supabase: SupabaseClientType,
  recruiter_id: string,
  user_id: string,
) {
  const rolesAndPermissions = (
    await supabase
      .from('roles')
      .select(
        'id, name, description, permissions:role_permissions(id, role_id, permission_id), recruiter(primary_admin)',
      )
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data!.reduce((acc, curr) => {
    acc[curr.id] = {
      id: curr.id,
      name: curr.name,
      isEditable:
        curr.name !== 'admin' || curr.recruiter?.primary_admin === user_id,
      assignedTo: [],
      description: curr.description,
      permissions: curr.permissions.map((item) => ({
        relation_id: item.id,
        id: item.permission_id,
        name: null,
        title: null,
        description: null,
        meta: null,
        isActive: true,
      })),
    };
    return acc;
  }, {} as rolesAndPermissions);
  return await mapPermissions(supabase, rolesAndPermissions);
}

async function mapPermissions(
  supabase: SupabaseClientType,
  rolesAndPermissions: rolesAndPermissions,
) {
  const data = (
    await supabase
      .from('permissions')
      .select('id, name, title, description, meta')
      .in('name', allPermissions)
      .eq('is_enable', true)
      .throwOnError()
  ).data!;
  const permission = data.reduce(
    (acc, curr) => {
      acc[curr.id] = {
        id: curr.id,
        name: curr.name,
        title: curr.title,
        description: curr.description,
        meta: curr.meta,
        isActive: false,
      };
      return acc;
    },
    {} as {
      [permission: number]: {
        id: number;
        name: DatabaseTable['permissions']['name'];
        title: string;
        description: string | null;
        meta: DatabaseTable['permissions']['meta'];
        isActive: boolean;
      };
    },
  );
  Object.keys(rolesAndPermissions).forEach((key) => {
    rolesAndPermissions[String(key)].permissions = data.map((perData) => ({
      isActive: false,
      relation_id: null,
      ...rolesAndPermissions[String(key)].permissions.find(
        (per) => per.id == perData.id,
      ),
      ...perData,
    }));
  });

  return { rolesAndPermissions, all_permission: permission };
}
