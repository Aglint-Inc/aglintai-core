import type { DatabaseFunctions, ZodTypeToSchema } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
// import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { formatSessions } from '@/utils/formatSessions';

type SchemaType = ZodTypeToSchema<
  DatabaseFunctions['create_session_request']['Args']
>;

export const createRequestSchema = z.object({
  application: z.string().uuid(),
  sessions: z.array(z.string().uuid()),
  request: z.object({
    assignee_id: z.string().uuid(),
    note: z.string().nullish(),
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
  const db = createPrivateClient();
  const data =
    (
      await db
        .from('request')
        .select(
          'id, status, type, application_id, request_relation(session_id)',
        )
        .eq('application_id', input.application)
        .eq('type', input.request.type)
        .neq('status', 'completed')
        .throwOnError()
    ).data ?? [];
  const selectedSessionIds = input.sessions;
  const isAllowed = data.some(({ request_relation }) => {
    const sessionIds = request_relation.map(({ session_id }) => session_id);
    return (
      selectedSessionIds.every((id) => sessionIds.includes(id)) ||
      sessionIds.every((id) => selectedSessionIds.includes(id))
    );
  });
  if (isAllowed)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message:
        'Request already exists for the provided application and sessions',
    });

  const [
    {
      data: { name },
    },
    { data: session_names },
  ] = await Promise.all([
    db
      .from('application_view')
      .select('name')
      .eq('id', input.application)
      .single()
      .throwOnError(),
    db
      .from('interview_session')
      .select('name')
      .in('id', input.sessions)
      .throwOnError(),
  ]);
  const sessions = formatSessions(session_names.map(({ name }) => name));
  await db
    .rpc('create_session_request', {
      ...input,
      request: {
        ...input.request,
        assigner_id: ctx.user_id,
        status: 'to_do',
        title: `Schedule ${sessions} for ${name}`,
      },
    })
    .throwOnError();
};

export const create_request = privateProcedure
  .input(createRequestSchema)
  .mutation(mutation);
