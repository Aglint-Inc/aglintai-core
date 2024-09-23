import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const applicationMetaSchema = z.object({ application_id: z.string().uuid() });

const query = async (ctx: PrivateProcedure<typeof applicationMetaSchema>) => {
  return await getApplicationMeta(ctx);
};

export const applicationMeta = privateProcedure
  .input(applicationMetaSchema)
  .query(query);

const getApplicationMeta = async (
  ctx: PrivateProcedure<typeof applicationMetaSchema>,
) => {
  const db = createPrivateClient();
  const {
    input: { application_id },
  } = ctx;

  return (
    await db
      .from('application_view')
      .select(
        'name, city, email, phone, current_job_title, resume_processing_state,timezone, processing_status, resume_score, badges, bookmarked, file_url, task_count, activity_count, status, candidate_id',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;
};
