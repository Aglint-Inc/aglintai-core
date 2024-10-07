import { customSchedulingSettingsUserSchema } from '@aglint/shared-types/src/db/common.zod';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const Schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  scheduling_settings: customSchedulingSettingsUserSchema,
  profile_image: z.string().nullable().optional(),
  linked_in: z.string().optional(),
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

  await db
    .from('recruiter_user')
    .update({
      first_name,
      last_name,
      phone,
      linked_in,
      profile_image,
      scheduling_settings,
    })
    .eq('user_id', user_id)
    .throwOnError();
};

export const updateUser = privateProcedure.input(Schema).mutation(mutation);
