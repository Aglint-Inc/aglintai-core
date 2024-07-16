import {seedAuthUsers} from './utils/seedAuthUsers';
import {supabaseAdmin} from './supabase/SupabaseAdmin';
import {seedCommonTable} from './utils/seedCommonTable';

const main = async () => {
  await seedAuthUsers();

  await supabaseAdmin.auth.signOut();
  await seedCommonTable('recruiter');
  await seedCommonTable('roles');
  await seedCommonTable('permissions');
  await seedCommonTable('recruiter_user', 'user_id');
  await seedCommonTable('recruiter_relation');
  await seedCommonTable('role_permissions');
  // await seedCommonTable('public_jobs');
  // await seedCommonTable('candidates');
  // await seedCommonTable('candidate_files');
  // await seedCommonTable('applications');
};

main();
