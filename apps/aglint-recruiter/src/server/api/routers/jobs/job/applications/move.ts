import type {
  DatabaseFunctions,
  DatabaseTable,
  ZodTypeToSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { formatSessions } from '@/utils/formatSessions';

import { createRequestSchema } from '../../../requests/create/create_request';

type Params =
  | ({
      status: Extract<DatabaseTable['applications']['status'], 'interview'>;
      job_id: string;
    } & DatabaseFunctions['move_to_interview']['Args'])
  | {
      status: Exclude<DatabaseTable['applications']['status'], 'interview'>;
      job_id: string;
      applications: string[];
    };

const nonInterviewSchema = z.object({
  status: z.enum(['new', 'qualified', 'disqualified']),
  job_id: z.string().uuid(),
  applications: z.array(z.string().uuid()),
});

const interviewSchema = z
  .object({
    status: z.literal('interview'),
    job_id: z.string().uuid(),
    applications: z.array(z.string().uuid()),
  })
  .merge(createRequestSchema.omit({ application: true }));

const schema = interviewSchema.or(
  nonInterviewSchema,
) satisfies ZodTypeToSchema<Params>;

const moveToInterview = async ({
  ctx,
  input,
}: PrivateProcedure<typeof interviewSchema>) => {
  const [{ data }, { data: session_names }] = await Promise.all([
    ctx.db
      .from('application_view')
      .select('id, name')
      .in('id', input.applications)
      .throwOnError(),
    ctx.db
      .from('interview_session')
      .select('name')
      .in('id', input.sessions)
      .throwOnError(),
  ]);
  const sessions = formatSessions(session_names.map(({ name }) => name));
  const requests: DatabaseFunctions['move_to_interview']['Args']['requests'] =
    data.map(({ id: application_id, name }) => ({
      application_id,
      title: `Schedule ${sessions} for ${name}`,
      status: 'to_do',
      assigner_id: ctx.user.id,
      ...input.request,
    }));
  return await ctx.db
    .rpc('move_to_interview', {
      applications: input.applications,
      sessions: input.sessions,
      requests,
    })
    .throwOnError();
};

const moveToNonInterview = async ({
  ctx,
  input,
}: PrivateProcedure<typeof nonInterviewSchema>) => {
  const { applications, ...rest } = input;
  const payload = applications.map((id) => ({
    id,
    recruiter_id: ctx.recruiter_id,
    ...rest,
  }));
  return await ctx.db.from('applications').upsert(payload).throwOnError();
};

const mutation = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  if (input.status === 'interview')
    return await moveToInterview({ ctx, input });
  return await moveToNonInterview({ ctx, input });
};

export const move = privateProcedure.input(schema).mutation(mutation);
