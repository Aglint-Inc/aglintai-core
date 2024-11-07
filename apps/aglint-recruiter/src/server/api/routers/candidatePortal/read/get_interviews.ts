import {
  type CandidatePortalProcedure,
  candidatePortalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { application_id } }: CandidatePortalProcedure) => {
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

export const get_interviews = candidatePortalProcedure.query(query);

export type GetInterviews = ProcedureDefinition<typeof get_interviews>;
