import { recruiterRelationUpdateSchema } from '@aglint/shared-types';
import {} from '@aglint/shared-types/src/db/tables/recruiter.types';
import { CustomRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { TRPCError } from '@trpc/server';

import { type PrivateProcedure, publicProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { ERRORS } from '@/server/enums';

const RecruiterUserSchema = CustomRecruiterUserUpdateSchema.pick({
  first_name: true,
  last_name: true,
  linked_in: true,
  office_location_id: true,
  employment: true,
  position: true,
  department_id: true,
  phone: true,
  user_id: true,
  profile_image: true,
});

const RecruiterRelationSchema = recruiterRelationUpdateSchema.pick({
  role_id: true,
  role: true,
  manager_id: true,
});

const Schema = RecruiterUserSchema.merge(RecruiterRelationSchema);

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof Schema>) => {
  const db = createPrivateClient();
  const { user_id, role_id, role, manager_id, ...newValue } = input;

  if (role !== 'admin') throw new TRPCError(ERRORS.FORBIDDEN);

  // RPC.throwOnError()

  const userData = (
    await db
      .from('recruiter_user')
      .update({ ...newValue })
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
      .single()
      .throwOnError();
  }
};

export const updateUser = publicProcedure.input(Schema).mutation(mutation);
