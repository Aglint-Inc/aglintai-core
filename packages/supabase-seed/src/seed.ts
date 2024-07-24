import {seedAuthUsers} from './utils/seedAuthUsers';
import {supabaseAdmin} from './supabase/SupabaseAdmin';
import {seedCommonTable} from './utils/seedCommonTable';
import {DatabaseTable} from '@aglint/shared-types';

const main = async () => {
  await seedAuthUsers();

  await supabaseAdmin.auth.signOut();
  const tables_in_order: (keyof DatabaseTable)[] = [
    'recruiter',
    'roles',
    'permissions',
    'recruiter_user',
    'recruiter_relation',
    'role_permissions',
    'public_jobs',
    'candidates',
    'candidate_files',
    'applications',
    'interview_plan',
    'interview_module',
    'interview_module_relation',
    'interview_plan',
    'interview_session',
    'interview_session_relation',
  ];

  for (const table of tables_in_order) {
    let primary_key = 'id';
    if (table === 'recruiter_user') {
      primary_key = 'user_id';
    }
    await seedCommonTable(table, primary_key);
  }
};

main();
