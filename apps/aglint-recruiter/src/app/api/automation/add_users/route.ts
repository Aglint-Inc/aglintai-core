import { schedulingSettingType } from '@aglint/shared-types';
import { NextResponse } from 'next/server';

import { InviteUserAPIType } from '@/src/components/CompanyDetailComp/TeamManagement/utils';
import { registerMember } from '@/src/pages/api/invite_user';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';
import timeZone from '@/src/utils/timeZone';

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

export async function POST(req) {
  const supabaseAdmin = getSupabaseServer();
  try {
    const {
      recruiter_id,
      forms,
    }: {
      recruiter_id: string;
      forms: user[];
    } = await req.json();

    const { data: recruiter_user } = await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter_user!public_recruiter_relation_user_id_fkey(user_id),roles(name)',
      )
      .eq('recruiter_id', recruiter_id)
      .eq('recruiter_user.status', 'active')
      .throwOnError();

    const { data: recruiter } = await supabaseAdmin
      .from('recruiter')
      .select('*')
      .eq('id', recruiter_id)
      .single()
      .throwOnError();

    const { data: locations } = await supabaseAdmin
      .from('office_locations')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError();

    const { data: departments } = await supabaseAdmin
      .from('departments')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError();

    const { data: roles } = await supabaseAdmin
      .from('roles')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError();

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
        role: role.name,
        manager_id:
          role.name === 'admin'
            ? null
            : manager_ids[Math.floor(Math.random() * manager_ids.length)],
        office_location_id: locationId,
        scheduling_settings: {
          ...recruiter.scheduling_settings,
          timeZone: timeZone.find(
            (item) =>
              item.label ===
              locations.find((loc) => loc.id === locationId).timezone,
          ),
        } as schedulingSettingType,
      } as InviteUserAPIType['request']['users'][number];
    });

    const create_id = adminIds[Math.floor(Math.random() * adminIds.length)];

    const requests = users.map((user) =>
      registerMember(supabaseAdmin, user, recruiter_id, create_id),
    );

    const results = await Promise.allSettled(requests);

    const addedUserEmails = [];

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
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
