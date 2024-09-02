import { type DatabaseTable, type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { allPermissions } from '@/src/constant/role_and_permissions';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { type GetRoleAndPermissionsAPI } from './type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<GetRoleAndPermissionsAPI>(
    req,
    res,
  );
  requestHandler(
    'POST',
    async ({ requesterDetails }) => {
      const { recruiter_id, user_id } = requesterDetails;
      const result = await getRoleAndPermissionsWithUserCount(
        recruiter_id,
        user_id,
      );
      return result;
    },
    [],
  );
}

const getRoleAndPermissions = async (recruiter_id: string, user_id: string) => {
  return supabase
    .from('roles')
    .select(
      'id,name, description,permissions:role_permissions(id, role_id, permission_id), recruiter(primary_admin)',
    )
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => {
      const rolesAndPermissions = data.reduce(
        (acc, curr) => {
          // acc[curr.id] = {
          //   ...acc[curr.roles.id],
          //   id: curr.role_id,
          //   name: curr.roles.name,
          //   isEditable: curr.roles.name !== 'admin',
          //   assignedTo: [],
          //   description: curr.roles.description,
          //   permissions: [
          //     ...(acc[curr.roles.id]?.permissions || []),
          //     {
          //       relation_id: curr.id,
          //       id: curr.permission_id,
          //       name: null,
          //       title: null,
          //       description: null,
          //       meta: null,
          //       isActive: true,
          //     },
          //   ],
          // };
          acc[curr.id] = {
            id: curr.id,
            name: curr.name,
            isEditable:
              curr.name !== 'admin' || curr.recruiter.primary_admin === user_id,
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
        },
        {} as {
          [roles: string]: {
            id: string;
            name: string;
            isEditable: boolean;
            assignedTo: string[];
            description: string;
            permissions: {
              relation_id: string;
              id: number;
              title: string;
              name: DatabaseTable['permissions']['name'];
              description: string;
              meta: DatabaseTable['permissions']['meta'];
              isActive: boolean;
            }[];
          };
        },
      );
      return rolesAndPermissions;
    })
    .then(async (rolesAndPermissions) => {
      const permission = await supabase
        .from('permissions')
        .select('id, name, title, description, meta')
        .in('name', allPermissions)
        .eq('is_enable', true)
        .throwOnError()
        .then(({ data }) => {
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
                description: string;
                meta: DatabaseTable['permissions']['meta'];
                isActive: boolean;
              };
            },
          );
          Object.keys(rolesAndPermissions).forEach((key) => {
            rolesAndPermissions[String(key)].permissions = data.map(
              (perData) => ({
                isActive: false,
                relation_id: null,
                ...rolesAndPermissions[String(key)].permissions.find(
                  (per) => per.id == perData.id,
                ),
                ...perData,
              }),
            );
          });

          return permission;
        });
      return { rolesAndPermissions, all_permission: permission };
    });
};

const getRoleAndPermissionsWithUserCount = async (
  recruiter_id: string,
  user_id: string,
) => {
  let rolesAndPermissionsDetails = await getRoleAndPermissions(
    recruiter_id,
    user_id,
  );
  return supabase
    .from('recruiter_relation')
    .select('role_id, user_id')
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => {
      Object.keys(rolesAndPermissionsDetails.rolesAndPermissions).map(
        (item) => {
          rolesAndPermissionsDetails.rolesAndPermissions[
            String(item)
          ].assignedTo =
            data
              .filter(
                (di) =>
                  di.role_id ==
                  rolesAndPermissionsDetails.rolesAndPermissions[String(item)]
                    .id,
              )
              .map((item) => item.user_id) || [];
        },
      );
      return rolesAndPermissionsDetails;
    });
};
