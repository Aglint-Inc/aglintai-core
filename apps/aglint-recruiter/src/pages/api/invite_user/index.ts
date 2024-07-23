import { DB, RecruiterUserType } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { InviteUserAPIType } from '@/src/components/CompanyDetailComp/TeamManagement/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { companyType } from '@/src/utils/userRoles';

import { server_getUserRoleAndId } from '../reset_password';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const requestHandler = apiRequestHandlerFactory<InviteUserAPIType>(req, res);
  requestHandler(
    'POST',
    async ({ body }) => {
      const { users, recruiter_id } = body;
      const { 
        // role,
         user_id: id } = await server_getUserRoleAndId({
        getVal: (name) => req.cookies[String(name)],
      });
      // if (role === 'admin') {
      let user_id: string = null;
      try {
        for (let user of users) {
          const recUser = await registerMember(user, recruiter_id, id);
          const { error: resetEmail } =
            await supabase.auth.resetPasswordForEmail(recUser.email, {
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
        user_id && (await supabase.auth.admin.deleteUser(user_id));
        return { error: String(error.message) };
      }
      // }
      // return { error: 'Permission denied!' };
    },
    ['users', 'recruiter_id'],
  );
}

async function registerMember(
  user: InviteUserAPIType['request']['users'][number],
  recruiter_id: string,
  create_id: string,
) {
  const { data, error } = await supabase.auth.admin.createUser({
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
  const { data: recUser } = await supabase
    .from('recruiter_user')
    .insert({
      user_id: userId,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.designation,
      employment: user.employment,
      interview_location: user.interview_location,
      department: user.department,
      email: email,
      status: 'invited',
      scheduling_settings: user.scheduling_settings,
    })
    .throwOnError()
    .select()
    .single();

  const { data: relation, error: relationError } = await supabase
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
    .select('*, roles(name)')
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
