import type { DatabaseTableUpdate } from '@aglint/shared-types';
import { customRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { z } from 'zod';

import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const schema = customRecruiterUserUpdateSchema.extend({
  user_id: z.string().uuid(),
  role_id: z.string().uuid().optional(),
  manager_id: z.string().uuid().optional(),
});

const query = async ({
  ctx: { recruiter_id },
  input: data,
}: PrivateProcedure<typeof schema>) => {
  const db = createPublicClient();
  const temp_role = await checkRole(db, data.user_id);
  let role: string;
  let role_id = data.role_id;
  let manager_id = data.manager_id;
  delete data.role_id;
  delete data.manager_id;
  // @ts-ignore - in data manager_id is required but for setMembers manager_id is optional
  const userData = await setMembers(db, data);

  if (userData && temp_role == 'admin') {
    const temp = await setRelation(db, {
      user_id: userData.user_id,
      recruiter_id,
      role_id: role_id,
      manager_id: manager_id,
    });
    role = temp.role;
    role_id = temp.role_id;
    manager_id = temp.manager_id || undefined;

    return {
      data: {
        ...userData,
        ...{ role: role, role_id: role_id || undefined },
        manager_id: manager_id || undefined,
      },
    };
  }
};

export const updateWithRole = privateProcedure.input(schema).mutation(query);

async function setMembers(
  supabaseAdmin: SupabaseClientType,
  data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
    user_id: string;
  },
) {
  return (
    await supabaseAdmin
      .from('recruiter_user')
      .update(data)
      .eq('user_id', data.user_id)
      .select(
        '*, office_location:office_locations(*), department:departments(id,name)',
      )
      .single()
      .throwOnError()
  ).data!;
}

async function setRelation(
  supabaseAdmin: SupabaseClientType,
  data: Omit<
    DatabaseTableUpdate['recruiter_relation'],
    'user_id' | 'recruiter_id'
  > & {
    user_id: string;
    recruiter_id: string;
  },
) {
  const qData = (
    await supabaseAdmin
      .from('recruiter_relation')
      .update(data)
      .eq('user_id', data.user_id)
      .eq('recruiter_id', data.recruiter_id)
      .select('role_id, manager_id, roles(name)')
      .single()
      .throwOnError()
  ).data!;
  return {
    role: qData.roles!.name,
    role_id: qData.role_id,
    manager_id: qData.manager_id,
  };
}

async function checkRole(supabaseAdmin: SupabaseClientType, user_id: string) {
  const qData = (
    await supabaseAdmin
      .from('recruiter_relation')
      .select('roles(name)')
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data!;
  if (qData.roles && qData.roles.name) return qData.roles.name;
  throw new Error('User already has a role');
}
