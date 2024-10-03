import { recruiterRelationUpdateSchema } from '@aglint/shared-types';
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
  linked_in: z.string(),
  office_location_id: z.number(),
  employment: z.string(),
  position: z.string(),
  department_id: z.number(),
  phone: z.string(),
  user_id: z.string(),
  profile_image: z.string(),
  scheduling_settings: customSchedulingSettingsSchema,
  role_id: z.string(),
  manager_id: z.string(),
  recruiter_id: z.string(),
});

export type UserAdminUpdateType = z.infer<typeof Schema>;

const mutation = async ({ input }: PrivateProcedure<typeof Schema>) => {
  const db = createPrivateClient();

  await db
    .rpc('update_user', {
      employment: input?.employment,
      first_name: input?.first_name,
      recruiter_id: input?.recruiter_id,
      scheduling_settings: input.scheduling_settings,
      user_id: input?.user_id,
      last_name: input?.last_name,
      department_id: input?.department_id,
      linked_in: input?.linked_in,
      manager_id: input?.manager_id,
      office_location_id: input?.office_location_id,
      phone: input?.phone,
      position: input?.position,
      profile_image: input?.profile_image,
      role_id: input?.role_id,
    })
    .throwOnError();
};

export const updateAdminUser = privateProcedure
  .input(Schema)
  .mutation(mutation);
