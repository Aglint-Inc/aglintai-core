import { recruiterRelationUpdateSchema } from '@aglint/shared-types';
import { type CustomSchedulingSettings } from '@aglint/shared-types/src/db/tables/common.types';
import {} from '@aglint/shared-types/src/db/tables/recruiter.types';
import { customRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';
import { z } from 'zod';

import {
  privateProcedure,
  type PrivateProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { customSchedulingSettingsSchema } from '@aglint/shared-types/src/db/common.zod';

const Schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  scheduling_settings: customSchedulingSettingsSchema,
  profile_image: z.string(),
  linked_in: z.string(),
  user_id: z.string(),
});

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

export const updateUser = privateProcedure.input(Schema).mutation(mutation);
