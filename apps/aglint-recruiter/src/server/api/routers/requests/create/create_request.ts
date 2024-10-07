import type { DatabaseFunctions, ZodTypeToSchema } from '@aglint/shared-types';
import { TRPCError } from '@trpc/server';
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
    note: z.string().optional(),
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
  const [{ data: application }, { data: interview_session }] =
    await Promise.all([
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
  if (!application)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Application not found',
    });
  if (!interview_session)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Interview session not found',
    });
  const sessions = formatSessions(
    interview_session.map(({ name }) => name).filter((name) => name !== null),
  );

  await db
    .rpc('create_session_request', {
      ...input,
      request: {
        ...input.request,
        assigner_id: ctx.user_id,
        status: 'to_do',
        title: `Schedule ${sessions} for ${application.name}`,
      },
    })
    .throwOnError();
};

export const create_request = privateProcedure
  .input(createRequestSchema)
  .mutation(mutation);
