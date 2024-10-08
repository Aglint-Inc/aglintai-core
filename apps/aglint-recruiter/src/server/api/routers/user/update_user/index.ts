import { customSchedulingSettingsUserSchema } from '@aglint/shared-types/src/db/common.zod';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

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
  const db = createPublicClient();

  const { user_id, ...payload } = input;

  await db
    .from('recruiter_user')
    .update({
      ...payload,
    })
    .eq('user_id', user_id)
    .throwOnError();
};

export const updateUser = privateProcedure.input(Schema).mutation(mutation);
