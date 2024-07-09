import { DatabaseEnums, DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

import { getRoleAndPermissionsAPI } from '../getRoleAndPermissions/type';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<getRoleAndPermissionsAPI>(
    req,
    res,
  );
  requestHandler(
    'POST',
    async ({ requesterDetails }) => {
      const { recruiter_id } = requesterDetails;
      return await getRoleAndPermissionsWithUserCount(recruiter_id);
    },
    [],
  );
}

const getRoleAndPermissions = async (recruiter_id: string) => {
  return supabase
    .from('role_permissions')
    .select('id, role_id, permission_id, roles(id,name, description)')
    .eq('recruiter_id', recruiter_id)
    .throwOnError()
    .then(({ data }) => {
      const rolesAndPermissions = data.reduce(
        (acc, curr) => {
          acc[curr.roles.id] = {
            ...acc[curr.roles.id],
            id: curr.role_id,
            name: curr.roles.name,
            assignedTo: [],
            description: curr.roles.description,
            permissions: [
              ...(acc[curr.roles.id]?.permissions || []),
              {
                relation_id: curr.id,
                id: curr.permission_id,
                name: null,
                title: null,
                description: null,
                isActive: true,
              },
            ],
          };
          return acc;
        },
        {} as {
          [roles: string]: {
            id: string;
            name: string;
            assignedTo: string[];
            description: string;
            permissions: {
              relation_id: string;
              id: number;
              title: string;
              name: DatabaseEnums['permissions_type'];
              description: string;
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
        .select('id, name, title, description')
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
                isActive: false,
              };
              return acc;
            },
            {} as {
              [permission: number]: {
                id: number;
                name: DatabaseEnums['permissions_type'];
                title: string;
                description: string;
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

const getRoleAndPermissionsWithUserCount = async (recruiter_id: string) => {
  let rolesAndPermissionsDetails = await getRoleAndPermissions(recruiter_id);
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
