import { signupCompanyAdmin, supabaseWrap } from '@aglint/shared-utils';
import { departments } from '../data/departments';
import { office_locations } from '../data/locations';
import { getSupabaseServer } from '../supabaseAdmin';
import dotenv from 'dotenv';
dotenv.config();
const supabaseAdmin = getSupabaseServer();

const testUser = {
  email: 'dileep@aglinthq.com',
  password: 'Welcome@123',
};
export const createCompanyAndAdmin = async () => {
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
      email: testUser.email,
      user_id: adminUser.user.id,
      first_name: 'Test',
      last_name: 'User',
    },
    supabaseAdmin
  );
  console.log('Created Test Company', recruiter_user.email);
  const departments = await addDepartments(recruiter.id);
  const locations = await addLocations(recruiter.id);
  return { recruiter_user, recruiter, departments, locations };
};

const addDepartments = async (recruiter_id: string) => {
  const deps = supabaseWrap(
    await supabaseAdmin
      .from('departments')
      .insert(departments.map((dept) => ({ ...dept, recruiter_id })))
      .select()
  );
  console.log('Added departments');
  return deps;
};

const addLocations = async (recruiter_id: string) => {
  const locations = supabaseWrap(
    await supabaseAdmin
      .from('office_locations')
      .insert(office_locations.map((loc) => ({ ...loc, recruiter_id })))
      .select()
  );
  console.log('Added locations');
  return locations;
};

export const addVaultSecrets = async () => {
  await supabaseAdmin.rpc('add_vault_secrets', {
    name: 'APP_URL',
    value: process.env.SEED_DATABASE_APP_URL!,
  });
  console.log('Added APP_URL to vault');
};

// Delete all company data
// Dangerous function
export const deleteAllCompanyData = async () => {
  const admin_user = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('email', testUser.email)
      .single()
  );
  supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .delete()
      .eq('primary_admin', admin_user.user_id)
  );
  supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .delete()
      .eq('email', admin_user.email)
  );
  const { error } = await supabaseAdmin.auth.admin.deleteUser(
    admin_user.user_id
  );
  if (error) {
    console.error('Error deleting admin user', error);
  }
  const authUsers = supabaseWrap(await supabaseAdmin.rpc('get_auth_users')) as {
    id: string;
  }[];
  const deleteAuthUsers = authUsers.map(async (user) => {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (error) {
      console.log('error deleting user', error);
    }
  });
  await Promise.all(deleteAuthUsers);
  console.log('Deleted all auth users and company data');
};
