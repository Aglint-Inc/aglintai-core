import { signupCompanyAdmin, supabaseWrap } from '@aglint/shared-utils';
import { departments } from '../data/departments';
import { office_locations } from '../data/locations';
import { getSupabaseServer } from '../supabaseAdmin';
import { testUsers } from '../data/users';
const testUser = {
  email: 'test@aglinthq.com',
  password: 'Welcome@123',
};
export const createCompanyAndAdmin = async () => {
  const supabaseAdmin = getSupabaseServer();
  const { data: adminUser, error } = await supabaseAdmin.auth.admin.createUser({
    email: testUser.email,
    password: testUser.password,
    email_confirm: true,
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
  console.log('Created Test Company', recruiter_user.email);
  const departments = await addDepartments(recruiter.id);
  console.log('Added departments');
  const locations = await addLocations(recruiter.id);
  console.log('Added locations');
  return { recruiter_user, recruiter, departments, locations };
};

const addDepartments = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const deps = supabaseWrap(
    await supabaseAdmin
      .from('departments')
      .insert(departments.map((dept) => ({ ...dept, recruiter_id })))
      .select()
  );
  return deps;
};

const addLocations = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const locations = supabaseWrap(
    await supabaseAdmin
      .from('office_locations')
      .insert(office_locations.map((loc) => ({ ...loc, recruiter_id })))
      .select()
  );
  return locations;
};

// Delete all company data

export const deleteAllCompanyData = async () => {
  const supabaseAdmin = getSupabaseServer();

  const deleteTeamMems = testUsers.map(async (user) => {
    const [membDetails] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select()
        .eq('email', user.email),
      false
    );
    if (!membDetails) {
      console.log(`${user.email} not found`);
      return;
    }
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
      membDetails.user_id
    );
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
  await Promise.all(deleteTeamMems);

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
  await supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .delete()
      .eq('email', admin_user.email)
  );
  const { error, data } = await supabaseAdmin.auth.admin.deleteUser(
    admin_user.user_id
  );

  if (error) {
    console.error('Error deleting admin user', error);
  }
  console.log('Deleted existing admin user and company data', admin_user.email);
};
