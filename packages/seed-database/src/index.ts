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
import { updateCompanyPref } from './lib/updateCompanyPref';
import { createCompanyTeam } from './lib/createCompanyTeam';
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
  await updateCompanyPref(recruiter.id, {
    scheduling: true,
    slack: true,
  });
  const team = await createCompanyTeam({
    company_roles,
    recruiter_user,
    recruiter,
    departments,
    locations,
  });

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
