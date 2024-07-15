import { DatabaseTable, DB } from '@aglint/shared-types';
import {
  defaultRolePermissionRelation,
  defaultRoles,
} from '@aglint/shared-utils';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

type apiPreSeed = {
  request: {
    type: 'INSERT';
    table: string;
    schema: string;
    record: DatabaseTable['recruiter'];
    old_record: null;
  };
  response: any;
};

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<apiPreSeed>(req, res);
  requestHandler(
    'POST',
    async ({ body }) => {
      const { record } = body;
      const recruiter_id = record.id;
      if (!recruiter_id) throw new Error('recruiter_id missing!!');
      await seedRolesAndPermissions(recruiter_id);
      return { success: true };
    },
    ['record'],
  );
}

async function seedRolesAndPermissions(rec_id: string) {
  const tempRoles = await createRoles(rec_id);
  const tempPermissions = await getPermissions();

  const tempRolePermissions: {
    permission_id: number;
    recruiter_id: string;
    role_id: string;
  }[] = [];

  tempRoles.forEach((role) => {
    defaultRolePermissionRelation[role.name].forEach((permission) => {
      const permission_id = tempPermissions[String(permission)];
      if (permission_id) {
        tempRolePermissions.push({
          role_id: role.id,
          permission_id: Number(permission_id),
          recruiter_id: rec_id,
        });
      }
    });
  });
  await createRolePermissions(tempRolePermissions);
  return true;
}
async function createRoles(rec_id: string) {
  return supabase
    .from('roles')
    .insert(
      defaultRoles.map((item) => ({
        name: item.name,
        recruiter_id: rec_id,
        description: item.description,
      })),
    )
    .select('id,name')
    .throwOnError()
    .then(({ data }) => data);
}
async function getPermissions() {
  const temp_p = (
    await supabase.from('permissions').select('id,name').throwOnError()
  ).data;
  //   const temp_p_set = new Set(...temp_p);
  //   const missing_permissions: { name: string; description: string }[] = [];
  //   for (let item of defaultPermissions) {
  //     if (!temp_p_set.has(item.name)) {
  //       missing_permissions.push(item);
  //     }
  //   }
  //   let missing: string[] = [];
  //   if (missing_permissions.length) {
  //     missing = (
  //       await supabase
  //         .from('roles')
  //         .insert(
  //           defaultPermissions.map((item) => ({
  //             name: item.name,
  //             description: item.description,
  //           })),
  //         )
  //         .select('name')
  //         .throwOnError()
  //     ).data.map((item) => item.name);
  //   }
  //   return [...temp_p, ...missing];
  return temp_p.reduce(
    (acc, crr) => {
      acc[crr.name] = crr.id;
      return acc;
    },
    {} as { [permission: string]: number },
  );
}
async function createRolePermissions(
  data: { permission_id: number; recruiter_id: string; role_id: string }[],
) {
  return supabase.from('role_permissions').insert(data).throwOnError().then();
}
