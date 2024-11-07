import { z } from 'zod';

import { interviewPlanRecruiterUserQuery } from '@/constant/interviewPlanRecruiterUserQuery';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const schema = z.object({
  includeSupended: z.boolean(),
  isCalendar: z.boolean(),
});

const query = async (args: PrivateProcedure<typeof schema>) => {
  const resUsers = await fetchUsers(args);
  return resUsers;
};

export const getMembers = privateProcedure.input(schema).query(query);

export const fetchUsers = async (args: PrivateProcedure<typeof schema>) => {
  const db = args.ctx.db;
  const recruiter_id = args.ctx.recruiter_id;
  const { includeSupended, isCalendar } = args.input;

  const query = db
    .from('recruiter_relation')
    .select(
      `manager_id, created_by, recruiter_user!public_recruiter_relation_user_id_fkey(${interviewPlanRecruiterUserQuery}, office_locations(*), departments(id,name)), roles(id,name)`,
    )
    .eq('recruiter_id', recruiter_id)
    .eq('is_active', true);

  if (includeSupended) {
    query.in('recruiter_user.status', ['active', 'suspended']);
  } else {
    query.in('recruiter_user.status', ['active']);
  }

  if (isCalendar) {
    query.eq('recruiter_user.is_calendar_connected', true);
  }

  return query.throwOnError().then(({ data, error }) => {
    if (error) throw new Error(error.message);
    const resAlter = data
      .filter((item) => Boolean(item.recruiter_user))
      .map((item) => ({
        ...item.recruiter_user,
        department_id: item?.recruiter_user?.departments?.id ?? null,
        departments: item?.recruiter_user?.departments || [],
        email: item?.recruiter_user?.email ?? '',
        first_name: item?.recruiter_user?.first_name ?? '',
        last_name: item?.recruiter_user?.last_name ?? '',
        profile_image: item?.recruiter_user?.profile_image ?? '',
        employment: item?.recruiter_user?.employment ?? 'fulltime',
        linked_in: item?.recruiter_user?.linked_in ?? '',
        office_location_id: item?.recruiter_user?.office_locations?.id ?? null,
        office_locations: item?.recruiter_user?.office_locations || [],
        user_id: item?.recruiter_user?.user_id ?? '',
        phone: item?.recruiter_user?.phone ?? '',
        position: item?.recruiter_user?.position ?? '',
        status: item?.recruiter_user?.status ?? 'active',
        role: item?.roles?.name ?? '',
        role_id: item?.roles?.id ?? '',
        manager_id: item?.manager_id ?? '',
        created_by: item?.created_by ?? '',
      }));

    return resAlter;
  });
};
