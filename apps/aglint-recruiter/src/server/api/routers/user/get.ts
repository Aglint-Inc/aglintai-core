import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const query = async ({ ctx: { user_id } }: PrivateProcedure) => {
  const db = createPublicClient();
  const result = await getRecruiterDetails(db, user_id);
  return { ...result, primary: result.recruiter.primary_admin === user_id };
};

export const get = privateProcedure.query(query);

export const getRecruiterDetails = async (
  supabaseAdmin: SupabaseClientType,
  user_id: string,
) => {
  const temp = (
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        '*, recruiter(*, office_locations(*), recruiter_preferences(*), departments(id,name)), recruiter_user!public_recruiter_relation_user_id_fkey(*), manager_details:recruiter_user!recruiter_relation_manager_id_fkey(first_name,last_name,position), roles(name,role_permissions(permissions!inner(name)))',
      )
      .match({ user_id, is_active: true })
      .single()
      .throwOnError()
  ).data!;

  const recruiter_user = {
    ...temp.recruiter_user,
    role: temp.roles!.name,
    role_id: temp.role_id,
    department: temp.recruiter?.departments?.find(
      (dep) => dep.id == temp.recruiter_user?.department_id,
    ),
    office_location: temp.recruiter?.office_locations?.find(
      (loc) => loc.id == temp.recruiter_user?.office_location_id,
    ),
    manager_id: temp.manager_id,
    manager_details: temp.manager_details
      ? {
          name: `${temp.manager_details.first_name} ${temp.manager_details.last_name}`.trim(),
          position: temp.manager_details.position,
        }
      : null,
    created_by: temp.created_by,
    recruiter_relation_id: temp.id,
    recruiter_id: temp.recruiter_id,
  };

  return {
    ...temp,
    recruiter: temp.recruiter!,
    recruiter_user,
  };
};
