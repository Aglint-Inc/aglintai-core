import { type SupabaseType } from '@aglint/shared-types';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { interviewCancelReasons, userDetails } from '@/utils/scheduling/const';

const schema = z.object({
  request_id: z.string().uuid(),
});

const query = async (args: PrivateProcedure<typeof schema>) => {
  const sessions = await fetchDetails(args);
  return sessions as Awaited<ReturnType<typeof fetchSessionDetails>>;
};

export const requestSessions = privateProcedure.input(schema).query(query);

export type RequestSessions = ProcedureDefinition<typeof requestSessions>;

const fetchDetails = async ({
  ctx,
  input,
}: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  const { request_id } = input;

  const [resSessions] = await Promise.all([
    fetchSessionDetails({
      request_id,
      supabaseCaller: db,
    }),
  ]);

  const sessions = resSessions.map((session) => {
    return {
      ...session,
      users: session?.users?.map((user) => {
        return {
          ...user,
          user_details: {
            ...user.user_details,
          },
        };
      }),
    };
  });
  return sessions;
};

export const fetchSessionDetails = async ({
  request_id,
  supabaseCaller,
}: {
  request_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('request')
    .select(
      `*,request_relation(*,interview_session(*,interview_meeting!inner(*),${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})))`,
    )
    .eq('id', request_id)
    .single();

  if (!data) return [];

  const reducedPlan = data.request_relation
    .flatMap((rel) => rel.interview_session)
    .filter((ses) => ses !== null)
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

  return reducedPlan;
};
