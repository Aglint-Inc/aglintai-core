import { DatabaseTable } from '@aglint/shared-types';
import { testUsers } from '../data/users';
import { addTeamMember } from './addUser';

export const createCompanyTeam = async ({
  company_roles,
  recruiter_user,
  recruiter,
  departments,
  locations,
}: {
  company_roles: DatabaseTable['roles'][];
  recruiter_user: DatabaseTable['recruiter_user'];
  recruiter: DatabaseTable['recruiter'];
  departments: DatabaseTable['departments'][];
  locations: DatabaseTable['office_locations'][];
}) => {
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
  return team;
};
