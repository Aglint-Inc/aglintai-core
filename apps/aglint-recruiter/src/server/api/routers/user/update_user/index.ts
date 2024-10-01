import { recruiterRelationUpdateSchema } from '@aglint/shared-types';
import {} from '@aglint/shared-types/src/db/tables/recruiter.types';
import { CustomRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { type z } from 'zod';

import { type PrivateProcedure, publicProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

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
  scheduling_settings: true,
});

const RecruiterRelationSchema = recruiterRelationUpdateSchema.pick({
  role_id: true,
  manager_id: true,
  recruiter_id: true,
});

const Schema = RecruiterUserSchema.merge(RecruiterRelationSchema);

export type UserUpdateType = z.infer<typeof Schema>;

const mutation = async ({ input }: PrivateProcedure<typeof Schema>) => {
  const db = createPrivateClient();

  const {
    user_id,
    role_id,
    manager_id,
    department_id,
    employment,
    first_name,
    last_name,
    linked_in,
    office_location_id,
    phone,
    position,
    recruiter_id,
    scheduling_settings,
    profile_image,
  } = input;

  await db
    .rpc('update_user', {
      department_id,
      employment,
      first_name,
      last_name,
      linked_in,
      manager_id,
      office_location_id,
      phone,
      position,
      profile_image,
      recruiter_id,
      role_id,
      scheduling_settings,
      user_id,
    })
    .throwOnError();
};

export const updateUser = publicProcedure.input(Schema).mutation(mutation);
