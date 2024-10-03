import {
  recruiterUserRowSchema,
  type RecruiterUserType,
} from '@aglint/shared-types';
import { customSchedulingSettingsSchema } from '@aglint/shared-types/src/db/common.zod';
import { z } from 'zod';

import { checkCalenderStatus } from '@/pages/api/scheduling/v1/check_calendar_status';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;

const body = z
  .object({
    first_name: z.string(),
    last_name: z.string().optional(),
    email: z.string(),
    position: z.string(),
    department_id: z.number(),
    office_location_id: z.number(),
    employment: recruiterUserRowSchema.shape.employment,
    scheduling_settings: customSchedulingSettingsSchema,
    manager_id: z.string().uuid(),
    role_id: z.string(),
    remote_id: z.string().optional(),
  })
  .array();

const query = async ({
  ctx: { recruiter_id, user_id },
  input: users,
}: PrivateProcedure<typeof body>) => {
  const supabase = createPublicClient();
  try {
    for (const user of users) {
      const recUser = await registerMember(
        supabase,
        user,
        recruiter_id,
        user_id,
      );
      checkCalenderStatus({ user_id: recUser.user_id });
      const { error: resetEmail } = await supabase.auth.resetPasswordForEmail(
        recUser.email,
        {
          redirectTo,
        },
      );
      if (resetEmail) {
        throw new Error('Sending reset password failed!');
      }
      return {
        created: true,
        user: recUser,
      };
    }
  } catch (error: any) {
    user_id && (await supabase.auth.admin.deleteUser(user_id));
    throw new Error(String(error.message));
  }
};

export const invite = privateProcedure.input(body).mutation(query);

export async function registerMember(
  supabaseAdmin: SupabaseClientType,
  user: z.infer<typeof body>[number],
  recruiter_id: string,
  create_id: string,
) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: user.email,
    password: 'Welcome@123',
    user_metadata: {
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      role: user.role_id,
      is_invite: 'true',
    },
    email_confirm: true,
  });
  if (error) throw new Error(error.message);
  const userId = data.user.id;
  const recUser = (
    await supabaseAdmin
      .from('recruiter_user')
      //@ts-ignore
      .insert({
        user_id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        position: user.position,
        department_id: user.department_id,
        office_location_id: user.office_location_id,
        employment: user.employment,
        status: 'invited',
        scheduling_settings: user.scheduling_settings,
        remote_id: user.remote_id,
      })
      .select(
        '*,  office_location:office_locations(*), department:departments(id,name)',
      )
      .single()
      .throwOnError()
  ).data!;

  const { data: relation, error: relationError } = await supabaseAdmin
    .from('recruiter_relation')
    .insert({
      recruiter_id,
      user_id: userId,
      role: 'interviewer',
      role_id: user.role_id,
      manager_id: user.manager_id,
      is_active: true,
      created_by: create_id,
    })
    .select('id, role_id, manager_id, created_by, roles(name)')
    .single();
  if (relationError) {
    throw new Error(
      'user relation creation failed!\n message' + relationError.message,
    );
  }

  const recUserType: RecruiterUserType = {
    ...recUser,
    department: recUser.department!,
    office_location: recUser.office_location!,
    role_id: relation.role_id!,
    role: relation.roles!.name,
    manager_id: relation.manager_id!,
    created_by: relation.created_by!,
    recruiter_relation_id: relation.id,
  };
  return recUserType;
}
