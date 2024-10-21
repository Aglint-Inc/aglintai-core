import { z } from 'zod';

import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { type SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  key: z.string().optional(),
  options: z.object({
    jobs: z.boolean().optional(),
    users: z.boolean().optional(),
    task_sync: z.boolean().optional(),
    candidates: z.boolean().optional(),
    departments: z.boolean().optional(),
    applications: z.boolean().optional(),
    interview_stages: z.boolean().optional(),
    office_locations: z.boolean().optional(),
  }),
  last_sync: z.object({
    full: z.string().optional(),
    jobs: z.string().optional(),
    users: z.string().optional(),
    full_sync: z.string().optional(),
  }),
});

export const post = privateProcedure
  .input(schema)
  .mutation(async ({ ctx: { recruiter_id }, input }) => {
    const db = createPublicClient();
    const temp = await setGreenhouseMeta(db, recruiter_id, input);
    return { options: temp.options || {}, last_sync: temp.last_sync || {} };
  });

export type Post = ProcedureDefinition<typeof post>;

export async function setGreenhouseMeta(
  supabaseAdmin: SupabaseClientType,
  recruiter_id: string,
  body: z.infer<typeof schema>,
) {
  return (
    (
      await supabaseAdmin
        .from('integrations')
        // @ts-ignore
        .update({ greenhouse_metadata: body })
        .eq('recruiter_id', recruiter_id)
        .select('greenhouse_metadata')
        .single()
        .throwOnError()
    ).data!.greenhouse_metadata
  );
}
