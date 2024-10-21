import { signupCompanyAdmin, supabaseWrap } from '@aglint/shared-utils';
import { departments } from '../data/departments';
import { office_locations } from '../data/locations';
import { getSupabaseServer } from '../supabaseAdmin';
const testUser = {
  email: 'test@aglinthq.com',
  password: 'Welcome@123',
};
export const createCompanyAndAdmin = async () => {
  const supabaseAdmin = getSupabaseServer();
  await deleteTestUserIfExist();

  const { data: adminUser, error } = await supabaseAdmin.auth.admin.createUser({
    email: testUser.email,
    password: testUser.password,
  });
  if (!adminUser || error) {
    throw new Error(error?.message || 'Failed to create admin user');
  }

  const { recruiter_user, recruiter } = await signupCompanyAdmin(
    {
      email: 'test@aglinthq.com',
      user_id: adminUser.user.id,
      first_name: 'Test',
      last_name: 'User',
    },
    supabaseAdmin
  );
  console.log('Created tested user', recruiter_user.email);
  await addDepartments(recruiter.id);
  console.log('Added departments');
  await addLocations(recruiter.id);
  console.log('Added locations');
  return { recruiter_user, recruiter };
};

const addDepartments = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('departments')
      .delete()
      .eq('recruiter_id', recruiter_id)
  );
  supabaseWrap(
    await supabaseAdmin
      .from('departments')
      .insert(departments.map((dept) => ({ ...dept, recruiter_id })))
  );
};

const addLocations = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('office_locations')
      .delete()
      .eq('recruiter_id', recruiter_id)
  );
  supabaseWrap(
    await supabaseAdmin
      .from('office_locations')
      .insert(office_locations.map((loc) => ({ ...loc, recruiter_id })))
  );
};

const deleteTestUserIfExist = async () => {
  const supabaseAdmin = getSupabaseServer();
  const [admin_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('email', testUser.email),
    false
  );
  if (!admin_user) return;
  await supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .delete()
      .eq('primary_admin', admin_user.user_id)
  );
  const { error, data } = await supabaseAdmin.auth.admin.deleteUser(
    admin_user.user_id
  );
  if (error) {
    console.error('Error deleting admin user', error);
  } else {
    console.log('Deleted existing admin user', admin_user.user_id);
  }
};
