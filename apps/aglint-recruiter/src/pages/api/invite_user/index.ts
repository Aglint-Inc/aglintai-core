import { RecruiterUserType, SupabaseType } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { InviteUserAPIType } from '@/src/components/CompanyDetailComp/TeamManagement/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';
import { companyType } from '@/src/utils/userRoles';

import { server_getUserRoleAndId } from '../reset_password';

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabaseAdmin = getSupabaseServer();
  const requestHandler = apiRequestHandlerFactory<InviteUserAPIType>(req, res);
  requestHandler(
    'POST',
    async ({ body }) => {
      const { users, recruiter_id } = body;
      const {
        // role,
        user_id: id,
      } = await server_getUserRoleAndId({
        getVal: (name) => req.cookies[String(name)],
      });
      // if (role === 'admin') {
      let user_id: string = null;
      try {
        for (let user of users) {
          const recUser = await registerMember(
            supabaseAdmin,
            user,
            recruiter_id,
            id,
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
  axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/check_calendar_status`,
    { user_id },
  );
};

export async function registerMember(
  supabaseAdmin: SupabaseType,
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
  const email = data.user.email;
  const userId = data.user.id;
  const { data: recUser } = await supabaseAdmin
    .from('recruiter_user')
    .insert({
      user_id: userId,
      first_name: user.first_name,
      last_name: user.last_name,
      email: email,
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
    .throwOnError();

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
    role_id: relation.role_id,
    role: relation.roles.name,
    manager_id: relation.manager_id,
    created_by: relation.created_by,
    recruiter_relation_id: relation.id,
  };
  return recUserType;
}
