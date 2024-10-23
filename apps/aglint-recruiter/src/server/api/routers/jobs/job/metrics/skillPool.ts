import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({ job_id: z.string().uuid() });

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = await createPrivateClient();
  return (
    await db
      .rpc('getskillpools', { jobid: input.job_id })
      .single()
      .throwOnError()
  ).data!;
};

export const skillPool = privateProcedure.input(schema).query(query);

export type SkillPool = ProcedureDefinition<typeof skillPool>;
