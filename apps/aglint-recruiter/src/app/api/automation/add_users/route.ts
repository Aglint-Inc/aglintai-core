import {
  type DatabaseTable,
  type RecruiterUserType,
  type SchedulingSettingType,
  type SupabaseType,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
import { companyType } from '@/utils/userRoles';

export const dynamic = 'force-dynamic';

type user = {
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  role: string;
};

type emp = 'fulltime' | 'parttime' | 'contractor';

const employment: emp[] = ['fulltime', 'parttime', 'contractor'];

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseServer();
  try {
    const {
      recruiter_id,
      forms,
    }: {
      recruiter_id: string;
      forms: user[];
    } = await req.json();

    const [recruiter_user, recruiter, locations, departments, roles] =
      await Promise.all([
        (
          await supabaseAdmin
            .from('recruiter_relation')
            .select(
              'recruiter_user!public_recruiter_relation_user_id_fkey!inner(user_id),roles!inner(name)',
            )
            .eq('recruiter_id', recruiter_id)
            .eq('recruiter_user.status', 'active')
        ).data!,
        (
          await supabaseAdmin
            .from('recruiter')
            .select('scheduling_settings')
            .eq('id', recruiter_id)
            .single()
        ).data!,
        (
          await supabaseAdmin
            .from('office_locations')
            .select('*')
            .eq('recruiter_id', recruiter_id)
        ).data!,
        (
          await supabaseAdmin
            .from('departments')
            .select('*')
            .eq('recruiter_id', recruiter_id)
        ).data!,
        (
          await supabaseAdmin
            .from('roles')
            .select('*')
            .eq('recruiter_id', recruiter_id)
        ).data!,
      ]);

    const manager_ids = recruiter_user
      .filter((user) => user?.recruiter_user?.user_id)
      .map((user) => user.recruiter_user.user_id);

    const adminIds = recruiter_user
      .filter(
        (user) =>
          user?.recruiter_user?.user_id && user?.roles?.name === 'admin',
      )
      .map((user) => user.recruiter_user.user_id);

    const users = forms.map((form) => {
      const locationId =
        locations[Math.floor(Math.random() * locations.length)].id;

      const departmentId =
        departments[Math.floor(Math.random() * departments.length)].id;

      const role =
        roles.find((role) => role.name === form.role) ||
        roles[Math.floor(Math.random() * roles.length)];

      return {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        linked_in: null,
        employment: employment[Math.floor(Math.random() * employment.length)],
        location_id: locationId,
        position: form.title,
        department_id: departmentId,
        role_id: role.id,
        is_calendar_connected: true,
        manager_id:
          role.name === 'admin'
            ? null
            : manager_ids[Math.floor(Math.random() * manager_ids.length)],
        office_location_id: locationId,
        scheduling_settings: {
          ...recruiter.scheduling_settings,
        } as SchedulingSettingType,
      } as InviteUserAPIType['request']['users'][number];
    });

    const create_id = adminIds[Math.floor(Math.random() * adminIds.length)];

    const requests = users.map((user) =>
      registerMember(supabaseAdmin, user, recruiter_id, create_id),
    );

    const results = await Promise.allSettled(requests);
    const addedUserEmails: string[] = [];

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        addedUserEmails.push(result.value.email);
      } else if (result.status === 'rejected') {
        addedUserEmails.push(result.reason);
      }
    });

    return NextResponse.json(
      { message: 'success', data: addedUserEmails },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        message: `please check the department, location and roles are present\n${e.message}`,
      },
      { status: 400 },
    );
  }
}

// ---------------------

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

  //
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('User not created');
  if (!data.user.email) throw new Error('User email not found');
  const email = data.user.email;
  const userId = data.user.id;
  const recUser = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .insert({
        user_id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: email,
        position: user.position,
        is_calendar_connected: true,
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
      .single(),
  );

  const relation = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .insert({
        recruiter_id,
        user_id: userId,
        role_id: user.role_id,
        manager_id: user.manager_id,
        is_active: true,
        created_by: create_id,
      })
      .select('id, role_id, manager_id, created_by, roles!inner(name)')
      .single(),
  );
  if (!relation.created_by) {
    throw new Error('Created by not found');
  }
  const recUserType = {
    ...recUser,
    role_id: relation.role_id,
    role: relation.roles.name,
    manager_id: relation?.manager_id ?? null,
    created_by: relation.created_by,
    recruiter_relation_id: relation.id,
  };
  return recUserType;
}

type InviteUserAPIType = {
  request: {
    users: (Pick<
      DatabaseTable['recruiter_user'],
      | 'first_name'
      | 'last_name'
      | 'email'
      | 'position'
      | 'department_id'
      | 'office_location_id'
      | 'employment'
      | 'scheduling_settings'
    > & {
      role_id: string;
      manager_id: string;
    })[];
    recruiter_id: string;
  };
  response: {
    created: boolean;
    user: RecruiterUserType;
  };
};
