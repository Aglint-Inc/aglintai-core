import { testUsers } from './data/users';
import { addTeamMember } from './lib/addUser';
import {
  createCompanyAndAdmin,
  deleteAllCompanyData,
} from './lib/createCompanyAndAdmin';
import dotenv from 'dotenv';
import { fetchCompanyRoles } from './lib/fetchRoles';
import { createPermissions } from './lib/createPermissions';
dotenv.config();
const main = async () => {
  await deleteAllCompanyData();
  await createPermissions();
  const { recruiter_user, recruiter, departments, locations } =
    await createCompanyAndAdmin();
  const { company_roles } = await fetchCompanyRoles(recruiter.id);
  const addedUsers = testUsers.map(async (testUser) => {
    const role_info = company_roles.find((r) => r.name === testUser.role);
    if (!role_info) throw new Error('Role not found');
    await addTeamMember({
      adminUser: recruiter_user,
      company_data: recruiter,
      user: {
        ...testUser,
        department_id: departments[0].id,
        office_location_id: locations[0].id,
        role_id: role_info.id,
      },
    });
  });
  await Promise.all(addedUsers);
  console.log('All team members added');
};

main();
