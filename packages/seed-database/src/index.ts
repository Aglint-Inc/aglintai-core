import { testUsers } from './data/users';
import { addTeamMember } from './lib/addUser';
import {
  createCompanyAndAdmin,
  deleteAllCompanyData,
} from './lib/createCompanyAndAdmin';
import dotenv from 'dotenv';
import { fetchCompanyRoles } from './lib/fetchRoles';
import { createPermissions } from './lib/createPermissions';
import { addJobs } from './lib/addJobs';
import { addCandidatesToCompany } from './lib/addCandidatesToCompany';
import { addInterviewTypes } from './lib/addInterviewTypes';
dotenv.config();
const main = async () => {
  await deleteAllCompanyData();
  await createPermissions();
  const { recruiter_user, recruiter, departments, locations } =
    await createCompanyAndAdmin();
  const {} = await addCandidatesToCompany({
    companyDetails: recruiter,
  });
  const { company_roles } = await fetchCompanyRoles(recruiter.id);
  const addedUsers = testUsers.map(async (testUser) => {
    const role_info = company_roles.find((r) => r.name === testUser.role);
    if (!role_info) throw new Error('Role not found');
    const { teamMember, teamMemberRelation } = await addTeamMember({
      adminUser: recruiter_user,
      company_data: recruiter,
      user: {
        ...testUser,
        department_id: departments[0].id,
        office_location_id: locations[0].id,
        role_id: role_info.id,
      },
    });
    return teamMember;
  });
  const team = await Promise.all(addedUsers);
  console.log('All team members added');

  const { int_modules, int_modules_relations } = await addInterviewTypes({
    admin: recruiter_user,
    company_detail: recruiter,
    departments,
    companyTeam: team,
  });
  await addJobs({
    companyDetails: recruiter,
    department_id: departments[0].id,
    location_id: locations[0].id,
    int_modules,
    int_modules_relations,
    team,
  });
};

main();
