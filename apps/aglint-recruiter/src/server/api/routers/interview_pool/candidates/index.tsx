import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const candidatesModuleSchema = z.object({
  module_id: z.string().uuid(),
});

const query = async ({
  input: { module_id },
}: PrivateProcedure<typeof candidatesModuleSchema>) => {
  const db = createPrivateClient();
  const response = (
    (
      await db
        .from('applications')
        .select(
          'id,interview_meeting!inner(*,interview_session!inner(*,interview_plan!inner(*),interview_session_relation(feedback))),candidates!inner(*),public_jobs!inner(id,job_title)',
        )
        .eq('interview_meeting.interview_session.module_id', module_id)
        .in('interview_meeting.status', ['confirmed', 'completed', 'waiting'])
        .not('interview_meeting', 'is', null)
        .not('interview_meeting.interview_session', 'is', null)
    ).data || []
  ).map((app) => {
    const sortedMeetings = app.interview_meeting.sort((a, b) => {
      const dateA = new Date(a.start_time ?? 0).getTime();
      const dateB = new Date(b.start_time ?? 0).getTime();
      return dateB - dateA;
    });

    const currentStage =
      app.interview_meeting[0]?.interview_session[0]?.interview_plan?.name ||
      '--';

    const nextInterview = sortedMeetings[0]?.interview_session[0]?.name || '--';

    const allScores = (app?.interview_meeting || [])
      .filter(
        (meet) =>
          meet.status === 'completed' &&
          meet.interview_session[0]?.interview_session_relation.some(
            (rel) => rel.feedback,
          ),
      )
      .flatMap((meet) =>
        meet.interview_session[0]?.interview_session_relation.map(
          (rel) => rel?.feedback?.recommendation,
        ),
      )
      .filter(Boolean);

    const totalSum = allScores
      .filter((a) => a !== undefined)
      .reduce((acc, score) => acc + score, 0);

    const maxScore = allScores.length;

    return {
      id: app.id,
      name: getFullName(app.candidates.first_name, app.candidates.last_name),
      job_title: app.public_jobs.job_title,
      job_id: app.public_jobs.id,
      stage: currentStage,
      nextInterview,
      score: totalSum !== 0 ? totalSum / maxScore : 0,
    };
  });

  return response;
};

export const candidatesModule = privateProcedure
  .input(candidatesModuleSchema)
  .query(query);

export type CandidatesModule = ProcedureDefinition<typeof candidatesModule>;
