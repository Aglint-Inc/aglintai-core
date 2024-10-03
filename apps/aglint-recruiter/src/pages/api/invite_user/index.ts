import { type RecruiterUserType } from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { apiRequestHandlerFactory } from '@/utils/apiUtils/responseFactory';
import {
  getSupabaseServer,
  type SupabaseClientType,
} from '@/utils/supabase/supabaseAdmin';
import { companyType } from '@/utils/userRoles';

import { checkCalenderStatus } from '../scheduling/v1/check_calendar_status';
import type { InviteUserAPIType } from './type';

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabaseAdmin = getSupabaseServer();
  const requestHandler = apiRequestHandlerFactory<InviteUserAPIType>(req, res);
  requestHandler(
    'POST',
    // @ts-ignore
    async ({ body, requesterDetails: { user_id } }) => {
      const { users, recruiter_id } = body!;
      try {
        for (const user of users) {
          const recUser = await registerMember(
            supabaseAdmin,
            user,
            recruiter_id,
            user_id,
          );
          checkCalendarStatus(recUser.user_id);
          const { error: resetEmail } =
            await supabaseAdmin.auth.resetPasswordForEmail(recUser.email, {
              redirectTo,
            });
          if (resetEmail) {
            throw new Error('Sending reset password failed!');
          }
          return {
            created: true,
            user: recUser,
          };
        }
      } catch (error: any) {
        user_id && (await supabaseAdmin.auth.admin.deleteUser(user_id));
        return { error: String(error.message) };
      }
      // }
      // return { error: 'Permission denied!' };
    },
    ['users', 'recruiter_id'],
  );
}

const checkCalendarStatus = async (user_id: string) => {
  checkCalenderStatus({ user_id });
};

export async function registerMember(
  supabaseAdmin: SupabaseClientType,
  user: Omit<InviteUserAPIType['request']['users'][number], 'manager_id'> & {
    manager_id?: string;
    remote_id?: string;
  },
  recruiter_id: string,
  create_id: string,
) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: user.email,
    password: 'Welcome@123',
    user_metadata: {
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      role: companyType.COMPANY,
      roles: companyType.COMPANY,
      is_invite: 'true',
      // invite_user: recruiter_user,
    },
    email_confirm: true,
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Error in registering user');
  const userId = data.user.id;
  const recUser = (
    await supabaseAdmin
      .from('recruiter_user')
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
