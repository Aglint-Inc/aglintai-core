import { type DatabaseTable } from '@aglint/shared-types';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { interviewCancelReasons, userDetails } from '@/utils/scheduling/const';

const interviewStagesSchema = z.object({ application_id: z.string().uuid() });

const query = async (ctx: PrivateProcedure<typeof interviewStagesSchema>) => {
  return await fetchDetails(ctx);
};

export const interviewStages = privateProcedure
  .input(interviewStagesSchema)
  .query(query);

export type InterviewStages = ProcedureDefinition<typeof interviewStages>;

const fetchDetails = async (
  ctx: PrivateProcedure<typeof interviewStagesSchema>,
) => {
  const resStages = await fetchSessionDetails(ctx);

  const reducedStages = resStages.map((stage) => {
    return {
      interview_plan: stage.interview_plan,
      sessions: stage.sessions,
    };
  });

  return reducedStages;
};

const fetchSessionDetails = async (
  ctx: PrivateProcedure<typeof interviewStagesSchema>,
) => {
  const {
    input: { application_id },
    ctx: { db },
  } = ctx;
  const { data } = await db
    .from('interview_plan')
    .select(
      `*,interview_session(*,interview_meeting!inner(*),${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails}))`,
    )
    .eq('interview_session.interview_meeting.application_id', application_id)
    .not('interview_session', 'is', null)
    .not('interview_session.interview_meeting', 'is', null);

  if (!data) return [];

  const reducedPlan = data
    .sort((a, b) => a.plan_order - b.plan_order)
    .map((op) => {
      const plan: DatabaseTable['interview_plan'] = {
        created_at: op.created_at,
        id: op.id,
        job_id: op.job_id,
        name: op.name,
        plan_order: op.plan_order,
        application_id: op.application_id,
        recruiter_id: op.recruiter_id,
      };
      const sessions = op.interview_session
        .sort((a, b) => a.session_order - b.session_order)
        .map((ses) => {
          const {
            interview_session_relation,
            interview_meeting,
            interview_session_cancel,
            interview_module,
            ...interview_session
          } = ses;
          return {
            interview_session,
            interview_meeting,
            interview_module,
            cancel_reasons: interview_session_cancel
              .filter((cancel) => !cancel.is_resolved && !cancel.is_ignored)
              .map((cancel) => {
                const {
                  interview_session_relation,
                  admin,
                  ...interview_session_cancel
                } = cancel;
                const user =
                  interview_session.session_type === 'debrief'
                    ? admin
                    : interview_session_relation?.interview_module_relation
                        ?.recruiter_user;
                return {
                  interview_session_cancel: interview_session_cancel,
                  recruiter_user: user!,
                };
              }),
            users: interview_session_relation.map((sesitem) => {
              const {
                interview_module_relation,
                debrief_user,
                ...interview_session_relation
              } = sesitem;
              return {
                interview_session_relation,
                interview_module_relation,
                user_details: (sesitem.interview_module_relation_id
                  ? interview_module_relation?.recruiter_user
                  : debrief_user)!,
              };
            }),
          };
        });
      return {
        interview_plan: plan,
        sessions,
      };
    });

  return reducedPlan;
};
