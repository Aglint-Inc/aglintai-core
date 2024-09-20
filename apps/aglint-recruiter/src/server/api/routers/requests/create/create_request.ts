import type { DatabaseFunctions, ZodTypeToSchema } from '@aglint/shared-types';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { formatSessions } from '@/utils/formatSessions';

type SchemaType = ZodTypeToSchema<
  DatabaseFunctions['create_session_request']['Args']
>;

export const createRequestSchema = z.object({
  application: z.string().uuid(),
  sessions: z.array(z.string().uuid()),
  request: z.object({
    assignee_id: z.string().uuid(),
    note: z.string(),
    priority: z.enum(['urgent', 'standard']),
    schedule_end_date: z.string(),
    schedule_start_date: z.string(),
    type: z.enum([
      'schedule_request',
      'cancel_schedule_request',
      'reschedule_request',
      'decline_request',
    ]),
  }),
}) satisfies SchemaType;

const mutation = async ({
  ctx,
  input,
}: PrivateProcedure<typeof createRequestSchema>) => {
  const [
    {
      data: { name },
    },
    { data: session_names },
  ] = await Promise.all([
    ctx.db
      .from('application_view')
      .select('name')
      .eq('id', input.application)
      .single()
      .throwOnError(),
    ctx.db
      .from('interview_session')
      .select('name')
      .in('id', input.sessions)
      .throwOnError(),
  ]);
  const sessions = formatSessions(session_names.map(({ name }) => name));
  await ctx.db
    .rpc('create_session_request', {
      ...input,
      request: {
        ...input.request,
        assigner_id: ctx.user.id,
        status: 'to_do',
        title: `Schedule ${sessions} for ${name}`,
      },
    })
    .throwOnError();
};

export const create_request = privateProcedure
  .input(createRequestSchema)
  .mutation(mutation);
