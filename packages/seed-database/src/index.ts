import { testUsers } from './data/users';
import { addTeamMember } from './lib/addUser';
import {
  createCompanyAndAdmin,
  deleteAllCompanyData,
} from './lib/createCompanyAndAdmin';
import dotenv from 'dotenv';
dotenv.config();
const main = async () => {
  await deleteAllCompanyData();
  const { recruiter_user, recruiter, departments, locations } =
    await createCompanyAndAdmin();
  const addedUsers = testUsers.map(async (testUser) => {
    await addTeamMember({
      adminUser: recruiter_user,
      company_data: recruiter,
      user: {
        ...testUser,
        department_id: departments[0].id,
        office_location_id: locations[0].id,
        role_id: testUser.role,
      },
    });
  });

  await Promise.all(addedUsers);
};

main();
