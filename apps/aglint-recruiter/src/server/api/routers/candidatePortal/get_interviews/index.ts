import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  application_id: z.array(z.string().uuid()),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { application_id } = input;

  const db = createPublicClient();

  const interviews = (
    await db
      .from('meeting_details')
      .select(
        'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
      )
      .eq('application_id', application_id)
      .throwOnError()
  ).data!;

  if (interviews.length) {
    return await Promise.all(
      interviews.map(async (interview) => {
        const interviewers = (
          await db
            .from('meeting_interviewers')
            .select('first_name,last_name,profile_image,position')
            .eq('session_id', interview?.session_id || '')
            .throwOnError()
        ).data;
        return {
          ...interview,
          interviewers: interviewers,
        };
      }),
    );
  }
  return [];
};

export const getInterviews = publicProcedure.input(schema).query(query);
