import { DatabaseTable } from '@aglint/shared-types';
import { getSupabaseServer } from '../supabaseAdmin';
import { supabaseWrap } from '@aglint/shared-utils';

export type UserInsertType = {
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  role:
    | 'admin'
    | 'hiring manager'
    | 'recruiting coordinator'
    | 'sourcer'
    | 'recruiter'
    | 'interviewer';
  position: string;
  employment: DatabaseTable['recruiter_user']['employment'];
};

export async function addTeamMember({
  company_data,
  adminUser,
  user,
}: {
  company_data: DatabaseTable['recruiter'];
  user: UserInsertType & {
    department_id: number;
    office_location_id: number;
    role_id: string;
  };
  adminUser: DatabaseTable['recruiter_user'];
}) {
  const supabaseAdmin = getSupabaseServer();
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: user.email,
    password: 'Welcome@123',
    user_metadata: {
      name: `${user.first_name} ${user.last_name || ''}`.trim(),
      role: 'Company', //enum
      roles: 'Company',
      is_invite: 'true',
    },
    email_confirm: true,
  });
  if (error) {
    throw new Error(error.message + ' ' + user.email);
  }
  if (!data) {
    throw new Error('team member was not able to be create');
  }
  const userId = data.user.id;
  const teamMember = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .insert({
        user_id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        position: user.position,
        is_calendar_connected: true,
        department_id: user.department_id,
        office_location_id: user.office_location_id,
        employment: user.employment,
        status: 'active',
      })
      .select()
      .single()
  );

  const teamMemberRelation = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .insert({
        recruiter_id: company_data.id,
        user_id: userId,
        role_id: user.role_id,
        manager_id: adminUser.user_id,
        is_active: true,
        created_by: adminUser.user_id,
      })
      .select('*')
      .single()
  );

  return {
    teamMember,
    teamMemberRelation,
  };
}
