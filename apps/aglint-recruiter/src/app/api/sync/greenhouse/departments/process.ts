import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { DatabaseTableInsert, DB } from '@aglint/shared-types';

export async function syncDepartments(
  recruiter_id: string,
  decryptKey: string,
) {
  const departments = await getGreenhouseDepartments(decryptKey);
  return await mapSaveDepartments(departments, recruiter_id);
}

export async function mapSaveDepartments(
  departments: Awaited<ReturnType<typeof getGreenhouseDepartments>>,
  recruiter_id: string,
) {
  const temp_department: DatabaseTableInsert['departments'][] = departments.map(
    (department) => {
      return {
        name: department.name,
        recruiter_id,
        remote_id: String(department.id),
      };
    },
  );
  const res = await supabaseAdmin
    .from('departments')
    .upsert(temp_department, { onConflict: 'remote_id' })
    .select()
    .throwOnError();
  return res.data;
}

// eslint-disable-next-line no-unused-vars
export async function getGreenhouseDepartments(key: string) {
  // const res = await axios.get<GreenhouseDepartmentAPI[]>('', {
  //   auth: {
  //     username: key,
  //     password: '',
  //   },
  // });
  // if (res.status !== 200) {
  //   // @ts-ignore
  //   throw new Error(res.data.message || 'Greenhouse Department API Failed!');
  // }
  // return res.data;
  return dummyData; // dummyData
}

export type GreenhouseDepartmentAPI = {
  id: number;
  name: string;
  parent_id: number | null;
  parent_department_external_id: string;
  child_ids: number[];
  child_department_external_ids: string[];
  external_id: null | string;
};

const dummyData: GreenhouseDepartmentAPI[] = [
  {
    id: 12345,
    name: 'Technology',
    parent_id: null,
    parent_department_external_id: '',
    child_ids: [34065, 25908],
    child_department_external_ids: ['child-1', 'child-2'],
    external_id: '89076',
  },
  {
    id: 67890,
    name: 'Administration',
    parent_id: 54647,
    parent_department_external_id: 'parent-1',
    child_ids: [],
    child_department_external_ids: [],
    external_id: null,
  },
];

export async function getDepartment(recruiter_id: string) {
  return (
    await supabaseAdmin
      .from('departments')
      .select('id, remote_id')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data.reduce(
    (acc, curr) => {
      acc[curr.remote_id] = curr.id;
      return acc;
    },
    {} as { [key: string]: number },
  );
}
