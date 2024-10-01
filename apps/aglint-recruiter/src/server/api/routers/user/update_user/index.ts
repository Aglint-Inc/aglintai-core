import { recruiterRelationUpdateSchema } from '@aglint/shared-types';
import { type CustomSchedulingSettings } from '@aglint/shared-types/src/db/tables/common.types';
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
    first_name,
    last_name,
    phone,
    scheduling_settings,
    profile_image,
    linked_in,
    user_id,
  } = input;

  const newSchedulingSettings = scheduling_settings as CustomSchedulingSettings;
  await db
    .from('recruiter_user')
    .update({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      linked_in: linked_in,
      profile_image,
      scheduling_settings: newSchedulingSettings,
    })
    .eq('user_id', user_id)
    .throwOnError();
};

export const updateUser = publicProcedure.input(Schema).mutation(mutation);
