import { getFullName } from '@aglint/shared-utils';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const feedbackPoolSchema = z.object({
  module_id: z.string().uuid(),
});

const query = async ({
  input: { module_id },
}: PrivateProcedure<typeof feedbackPoolSchema>) => {
  const db = createPrivateClient();
  const response = (
    await db
      .from('interview_session')
      .select(
        '*,interview_meeting(*,applications(id,candidates(first_name,last_name))),interview_session_relation(feedback,interview_module_relation(*,recruiter_user(user_id,first_name,last_name)))',
      )
      .eq('module_id', module_id)
      .neq('session_type', 'debrief')
      .in('interview_meeting.status', ['completed'])
      .not('interview_meeting', 'is', null)
      .not('interview_session_relation', 'is', null)
  ).data.flatMap((app) =>
    app.interview_session_relation
      .filter((ses) => ses.feedback)
      .map((rel) => ({
        recommendation: rel.feedback.recommendation,
        objective: rel.feedback.objective,
        interviewer: getFullName(
          rel.interview_module_relation.recruiter_user.first_name,
          rel.interview_module_relation.recruiter_user.last_name,
        ),
        interview_date: app.interview_meeting.start_time,
        candidate: getFullName(
          app.interview_meeting.applications.candidates.first_name,
          app.interview_meeting.applications.candidates.last_name,
        ),
      })),
  );

  return response;
};

export const feedbackPool = privateProcedure
  .input(feedbackPoolSchema)
  .query(query);
