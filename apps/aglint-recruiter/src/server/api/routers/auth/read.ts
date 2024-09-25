import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
  const data = (
    await db
      .from('recruiter_relation')
      .select(
        `*, 
        recruiter(*, office_locations(*), recruiter_preferences(*), departments(id,name)), 
        recruiter_user!public_recruiter_relation_user_id_fkey(*), 
        manager_details:recruiter_user!recruiter_relation_manager_id_fkey(first_name,last_name,position), 
        roles(name,role_permissions(permissions!inner(name)))`,
      )
      .match({ user_id: ctx.user_id, is_active: true })
      .single()
      .throwOnError()
  ).data;

  const recruiter_user = {
    ...data.recruiter_user,
    role: data.roles.name,
    role_id: data.role_id,
    department: data.recruiter?.departments?.find(
      (dep) => dep.id == data.recruiter_user.department_id,
    ),
    office_location: data.recruiter?.office_locations?.find(
      (loc) => loc.id == data.recruiter_user.office_location_id,
    ),
    manager_id: data.manager_id,
    manager_details: data.manager_details
      ? {
          name: `${data.manager_details.first_name} ${data.manager_details.last_name}`.trim(),
          position: data.manager_details.position,
        }
      : null,
    created_by: data.created_by,
    recruiter_relation_id: data.id,
    recruiter_id: data.recruiter_id,
  };

  return {
    recruiter_user,
    recruiter_id: data.recruiter_id,
    recruiter: data.recruiter,
  };
};

export const read = privateProcedure.query(query);
