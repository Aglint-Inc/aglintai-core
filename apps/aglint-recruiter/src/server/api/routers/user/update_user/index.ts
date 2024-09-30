import { z } from 'zod';

import { type PrivateProcedure, publicProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
const employmentTypeEnum = z.enum(['fulltime', 'parttime', 'contractor']);
const UserSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  linked_in: z.string().nullable(),
  office_location_id: z.number().nullable(),
  employment: employmentTypeEnum,
  position: z.string().nullable(),
  department_id: z.number().nullable(),
  role_id: z.string().nullable(),
  role: z.string().nullable(),
  phone: z.string().nullable(),
  manager_id: z.string().nullable(),
  user_id: z.string(),
  profile_image: z.string().nullable(),
});

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof UserSchema>) => {
  const db = createPrivateClient();
  const { user_id, role_id, role, manager_id, ...newValue } = input;

  //update member
  const userData = (
    await db
      .from('recruiter_user')
      .update(newValue)
      .eq('user_id', user_id)
      .throwOnError()
  ).data;

  //update relation
  if (userData && role == 'admin') {
    await db
      .from('recruiter_relation')
      .update({ manager_id, role_id, role })
      .eq('user_id', user_id)
      .eq('recruiter_id', recruiter_id)
      .select('role_id, manager_id, roles(name)')
      .single()
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        return {
          role: data.roles.name,
          role_id: data.role_id,
          manager_id: data.manager_id,
        };
      });
  }
};

export const updateUser = publicProcedure.input(UserSchema).mutation(mutation);
