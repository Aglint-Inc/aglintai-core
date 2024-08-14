import { DB } from '@aglint/shared-types';
import { SupabaseClient } from '@supabase/supabase-js';

import { registerMember } from '@/src/pages/api/invite_user';

import { getDepartment } from '../departments/process';
import { getOfficeLocations } from '../office_locations/process';

export async function filterMapUser(
  supabase: SupabaseClient<DB>,
  users: Awaited<ReturnType<typeof getGreenhouseUsers>>,
  recruiter_id: string,
  created_by: string,
) {
  const curr_email = await getCurrentUserEmail(supabase);
  const curr_departments = await getDepartment(supabase, recruiter_id);
  const curr_role = await getRole(supabase, recruiter_id);
  const scheduling_settings = await getScheduleSetting(supabase, recruiter_id);
  const curr_office_locations = await getOfficeLocations(
    supabase,
    recruiter_id,
  );
  const temp_user: Awaited<ReturnType<typeof registerMember>>[] = [];
  const filtered_user = users.filter(
    (user) => !curr_email.includes(user.primary_email_address),
  );
  for (let user of filtered_user) {
    temp_user.push(
      await registerMember(
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.primary_email_address,
          department_id: curr_departments[user.departments?.[0]?.id],
          office_location_id: curr_office_locations[user.offices?.[0]?.id],
          employment: 'fulltime',
          position: '',
          role_id: curr_role,
          scheduling_settings,
          remote_id: String(user.id),
        },
        recruiter_id,
        created_by,
      ),
    );
  }
  return temp_user;
}
export type filterMapUserType = Awaited<ReturnType<typeof filterMapUser>>;

// async function getOrCreateGetDepartment(
//   supabase: SupabaseClient<DB>,
//   curr_department: Awaited<ReturnType<typeof getDepartment>>,
//   department: Department,
//   recruiter_id: string,
// ) {
//   let res_id = curr_department[department.name];
//   if (res_id) {
//     const temp = (
//       await mapSaveDepartments(supabase, [department], recruiter_id)
//     )[0];
//     curr_department[department.name] = temp.id;
//     res_id = temp.id;
//   }
//   return res_id;
// }

async function getCurrentUserEmail(supabase: SupabaseClient<DB>) {
  return (
    await supabase.from('recruiter_user').select('email').throwOnError()
  ).data.map((item) => item.email);
}

// eslint-disable-next-line no-unused-vars
export async function getGreenhouseUsers(key: string) {
  // return axios.get<GreenhouseUserAPI>(
  //   'https://harvest.greenhouse.io/v1/users',
  //   {
  //     auth: {
  //       username: key,
  //       password: '',
  //     },
  //   },
  // );
  return dummyData;
}

export type GreenhouseUserApi = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  primary_email_address: string;
  updated_at: string;
  created_at: string;
  disabled: boolean;
  site_admin: boolean;
  emails: string[];
  employee_id: string;
  linked_candidate_ids: number[];
  offices: Office[];
  departments: Department[];
}[];

export type Department = {
  id: number;
  name: string;
  parent_id: number;
  parent_department_external_id: string;
  child_ids: number[];
  child_department_external_ids: string[];
  external_id: string;
};

export type Office = {
  id: number;
  name: string;
  location: Location;
  primary_contact_user_id: number;
  parent_id: number;
  parent_office_external_id: string;
  child_ids: number[];
  child_office_external_ids: string[];
  external_id: string;
};

export type Location = {
  name: string;
};

const dummyData: GreenhouseUserApi = [
  {
    id: 112,
    name: 'Juliet Burke',
    first_name: 'Juliet',
    last_name: 'Burke',
    primary_email_address: 'juliet.burke@example.com',
    updated_at: '2016-11-17T16:13:48.888Z',
    created_at: '2015-11-18T22:26:32.243Z',
    disabled: false,
    site_admin: true,
    emails: ['juliet.burke@example.com', 'other.woman@example.com'],
    employee_id: '221',
    linked_candidate_ids: [123, 654],
    offices: [
      {
        id: 47012,
        name: 'New York',
        location: {
          name: 'New York, United States',
        },
        primary_contact_user_id: 485538,
        parent_id: 50849,
        parent_office_external_id: 'parent-2',
        child_ids: [50891, 50852],
        child_office_external_ids: ['child-office-1', ''],
        external_id: '12345',
      },
    ],
    departments: [
      {
        id: 67890,
        name: 'Administration',
        parent_id: 54647,
        parent_department_external_id: 'parent-1',
        child_ids: [],
        child_department_external_ids: [],
        external_id: null,
      },
    ],
  },
  {
    id: 712,
    name: 'John Doe',
    first_name: 'John',
    last_name: 'Doe',
    primary_email_address: 'john.doe@example.com',
    updated_at: '2016-11-03T18:05:47.361Z',
    created_at: '2015-11-18T22:27:11.111Z',
    disabled: false,
    site_admin: true,
    emails: ['john.doe@example.com'],
    employee_id: '700',
    linked_candidate_ids: [789, 1022],
    offices: [
      {
        id: 47013,
        name: 'San Francisco',
        location: {
          name: 'San Francisco, California',
        },
        primary_contact_user_id: 150894,
        parent_id: 50850,
        parent_office_external_id: '14680',
        child_ids: [50852, 50891],
        child_office_external_ids: ['13473', '123473'],
        external_id: '15679',
      },
    ],
    departments: [
      {
        id: 25907,
        name: 'Marketing',
        parent_id: 25908,
        parent_department_external_id: '13473',
        child_ids: [50852, 50891],
        child_department_external_ids: ['13473', '123473'],
        external_id: '15679',
      },
    ],
  },
];
async function getRole(supabase: SupabaseClient<DB>, recruiter_id: string) {
  return (
    await supabase
      .from('roles')
      .select('id')
      .eq('recruiter_id', recruiter_id)
      .eq('name', 'interviewer')
      .single()
      .throwOnError()
  ).data.id;
}
async function getScheduleSetting(
  supabase: SupabaseClient<DB>,
  recruiter_id: string,
) {
  return (
    await supabase
      .from('recruiter')
      .select('scheduling_settings')
      .eq('id', recruiter_id)
      .single()
      .throwOnError()
  ).data.scheduling_settings;
}
