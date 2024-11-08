import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '../../trpc';

const schema = z.object({
  sessions_ids: z.array(z.string().uuid()),
});

const query = async ({ input, ctx }: PublicProcedure<typeof schema>) => {
  const { sessions_ids } = input;

  const db = ctx.adminDb;
  if (sessions_ids.length) {
    const { data: meetings } = await db
      .from('interview_session')
      .select('*,interview_meeting(*)')
      .in('id', sessions_ids)
      .order('session_order', {
        ascending: true,
      });

    const reduceSess = (meetings ?? []).map((ele) => {
      return {
        interview_session: ele,
        interview_meeting: ele.interview_meeting,
      };
    });
    return reduceSess;
  }
  return null;
};

export const getMeetings = publicProcedure.input(schema).query(query);

export type GetMeetings = ProcedureDefinition<typeof getMeetings>;
