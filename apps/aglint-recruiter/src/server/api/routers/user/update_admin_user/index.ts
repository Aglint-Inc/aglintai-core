import { z } from 'zod';

import { privateProcedure, type PrivateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { customSchedulingSettingsUserSchema } from '@aglint/shared-types/src/db/common.zod';

const Schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  linked_in: z.string().nullable(),
  office_location_id: z.number().nullable(),
  employment: z.string(),
  position: z.string(),
  department_id: z.number().nullable(),
  phone: z.string(),
  user_id: z.string(),
  profile_image: z.string().nullable(),
  scheduling_settings: customSchedulingSettingsUserSchema,
  role_id: z.string().nullable(),
  manager_id: z.string().nullable(),
  recruiter_id: z.string(),
  role: z.string().optional(),
});

export type UserAdminUpdateType = z.infer<typeof Schema>;

const mutation = async ({ input }: PrivateProcedure<typeof Schema>) => {
  const db = createPrivateClient();

  await db
    .rpc('update_user', {
      employment: input.employment,
      first_name: input.first_name,
      recruiter_id: input.recruiter_id,
      scheduling_settings: input.scheduling_settings,
      user_id: input.user_id,
      last_name: input.last_name,
      phone: input.phone,
      position: input.position,
      department_id: input.department_id as number,
      linked_in: input.linked_in as string,
      manager_id: input.manager_id as string,
      office_location_id: input.office_location_id as number,
      profile_image: input.profile_image as string,
      role_id: input.role_id as string,
    })
    .throwOnError();
};

export const updateAdminUser = privateProcedure
  .input(Schema)
  .mutation(mutation);
