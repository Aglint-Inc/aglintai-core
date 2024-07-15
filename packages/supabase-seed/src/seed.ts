import {DatabaseTable} from '@aglint/shared-types';
import {seedAuthUsers} from './utils/seedAuthUsers';
import {getJsonRecords} from './data';
import {seedRecruiterUser} from './utils/seedRecruiterUser';
import {seedCompanies} from './utils/seedCompanies';
import {seedCompaniesRoles} from './utils/seedRoles';

const main = async () => {
  const recruiter_seed_data = (await getJsonRecords(
    'recruiter'
  )) as DatabaseTable['recruiter'][];
  const recruiter_user_seed_data = (await getJsonRecords(
    'recruiter_user'
  )) as DatabaseTable['recruiter_user'][];
  const auth_users_data = await seedAuthUsers(
    recruiter_seed_data,
    recruiter_user_seed_data
  );
  const auth_user_map: {[email: string]: string} = {};
  auth_users_data.forEach(r => {
    auth_user_map[r.email] = r.id;
  });
  const company_data = await seedCompanies(recruiter_seed_data);

  const recruiter_user_data = await seedRecruiterUser(
    auth_user_map,
    recruiter_user_seed_data
  );
  const s = await seedCompaniesRoles(company_data);
};

main();
