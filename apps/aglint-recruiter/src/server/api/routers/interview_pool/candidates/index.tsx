import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const candidatesModuleSchema = z.object({
  module_id: z.string().uuid(),
});

const query = async ({
  ctx: { db },
  input: { module_id },
}: PrivateProcedure<typeof candidatesModuleSchema>) => {
  const response = (
    await db
      .from('applications')
      .select(
        'id,interview_meeting(*,interview_session(*,interview_plan(*),interview_session_relation(feedback))),candidates(*),public_jobs(id,job_title)',
      )
      .eq('interview_meeting.interview_session.module_id', module_id)
      .in('interview_meeting.status', ['confirmed', 'completed', 'waiting'])
      .not('interview_meeting', 'is', null)
      .not('interview_meeting.interview_session', 'is', null)
  ).data.map((app) => {
    const sortedMeetings = app.interview_meeting.sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
    );

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

    const totalSum = allScores.reduce((acc, score) => acc + score, 0);

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
