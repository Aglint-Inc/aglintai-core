/* eslint-disable security/detect-object-injection */
import {} from '@aglint/shared-types';
import { scheduling_options_schema } from '@aglint/shared-utils';
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { verifyRecruiterSelectedSlots } from '@/services/CandidateSchedule/utils/bookingUtils/verifyRecruiterSelctedOptions';

const schema = z.object({
  candidate_tz: z.string(),
  filter_json_id: z.string(),
  api_options: scheduling_options_schema,
});

const query = async ({
  input: { api_options, candidate_tz, filter_json_id },
}: PublicProcedure<typeof schema>) => {
  const { all_day_plans } = await verifyRecruiterSelectedSlots({
    api_options,
    candidate_tz,
    filter_json_id,
  });
  const res = all_day_plans;
  return res;
};

export const slotsCandidateInvite = publicProcedure.input(schema).query(query);
