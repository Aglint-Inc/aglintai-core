import {DatabaseTable} from '@aglint/shared-types';
import {seedAuthUsers} from './utils/seedAuthUsers';
import {getJsonRecords} from './data';
import {seedRecruiterUser} from './utils/seedRecruiterUser';
import {seedCompanies} from './utils/seedCompanies';
import {seedCompaniesRoles} from './utils/seedRoles';
import {seedPermissions} from './utils/seedPermissions';
import {supabaseAdmin} from './supabase/SupabaseAdmin';
import {seedRecruiterRelation} from './utils/seedRecruiterRelation';
import {seedRolePermissions} from './utils/seedRolePermissions';

const main = async () => {
  await seedAuthUsers();

  await supabaseAdmin.auth.signOut();
  await seedCompanies();
  await seedCompaniesRoles();
  await seedPermissions();
  await seedRecruiterUser();
  await seedRecruiterRelation();
  await seedRolePermissions();
};

main();
