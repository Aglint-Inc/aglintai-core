import { type DatabaseTable } from '@aglint/shared-types';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const trainingProgressSchema = z.object({
  trainer_ids: z.array(z.string().uuid()),
});

const query = (p: PrivateProcedure<typeof trainingProgressSchema>) => {
  return fetchProgress(p);
};

export const trainingProgress = privateProcedure
  .input(trainingProgressSchema)
  .query(query);

export type TrainingProgress = ProcedureDefinition<typeof trainingProgress>;

export const fetchProgress = async (
  props: PrivateProcedure<typeof trainingProgressSchema>,
) => {
  const db = await createPrivateClient();
  const {
    input: { trainer_ids },
  } = props;
  const { data } = await db
    .from('interview_training_progress')
    .select(
      '*,interview_session_relation!inner(*,interview_session!inner(id,name,session_type,interview_meeting!inner(id,status)),interview_module_relation!inner(id)),recruiter_user!inner(first_name,last_name)',
    )
    .in('interview_session_relation.interview_module_relation_id', trainer_ids)
    .eq('interview_session_relation.is_confirmed', true)
    .order('created_at', { ascending: false })
    .not('interview_session_relation', 'is', null)
    .throwOnError();
  const resRel = (data || [])
    .filter(
      (ses) =>
        ses.interview_session_relation.interview_session.interview_meeting
          .status === 'completed',
    )
    .map((sesRel) => {
      const interview_session_relation: DatabaseTable['interview_session_relation'] =
        {
          feedback: sesRel.interview_session_relation.feedback,
          accepted_status: sesRel.interview_session_relation.accepted_status,
          id: sesRel.interview_session_relation.id,
          interview_module_relation_id:
            sesRel.interview_session_relation.interview_module_relation_id,
          interviewer_type: sesRel.interview_session_relation.interviewer_type,
          is_confirmed: sesRel.interview_session_relation.is_confirmed,
          session_id: sesRel.interview_session_relation.session_id,
          training_type: sesRel.interview_session_relation.training_type,
          user_id: sesRel.interview_session_relation.user_id,
        };
      return {
        ...sesRel,
        interview_meeting:
          sesRel.interview_session_relation.interview_session.interview_meeting,
        interview_session_relation,
        interview_module_relation:
          sesRel.interview_session_relation.interview_module_relation,
        interview_session: sesRel.interview_session_relation.interview_session,
      };
    });

  return resRel;
};
