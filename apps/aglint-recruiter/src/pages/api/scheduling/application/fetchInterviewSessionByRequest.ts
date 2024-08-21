/* eslint-disable no-console */
import { DatabaseTable, SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  interviewCancelReasons,
  userDetails,
} from '@/src/components/Scheduling/CandidateDetails/queries/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiInterviewSessionRequest = {
  request: {
    request_id: string;
  };
  response: {
    success: boolean;
    sessions: Awaited<ReturnType<typeof fetchSessionDetails>>;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestHandler = apiRequestHandlerFactory<ApiInterviewSessionRequest>(
      req,
      res,
    );

    requestHandler(
      'POST',
      async ({ body }) => {
        const { request_id } = body;
        const sessions = await fetchDetails(request_id);
        return {
          success: true,
          sessions,
        };
      },
      ['request_id'],
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchDetails = async (request_id: string) => {
  const [resSessions] = await Promise.all([
    fetchSessionDetails({
      request_id,
      supabaseCaller: supabaseAdmin,
    }),
  ]);

  const sessions = resSessions.map((session) => {
    return {
      ...session,
      users: session.users.map((user) => {
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

const fetchSessionDetails = async ({
  request_id,
  supabaseCaller,
}: {
  request_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('request')
    .select(
      `*,request_relation(*,interview_session(*,interview_meeting(*),${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})))`,
    )
    .eq('id', request_id)
    .single();

  if (!data) return [];

  const reducedPlan = data.request_relation
    .flatMap((rel) => rel.interview_session)
    .map((ses) => {
      return {
        interview_session: ses,
        interview_meeting: ses.interview_meeting,
        cancel_reasons: ses.interview_session_cancel
          .filter((cancel) => !cancel.is_resolved && !cancel.is_ignored)
          .map((cancel) => {
            const interview_session_cancel: DatabaseTable['interview_session_cancel'] =
              {
                id: cancel.id,
                reason: cancel.reason,
                is_resolved: cancel.is_resolved,
                is_ignored: cancel.is_ignored,
                created_at: cancel.created_at,
                cancel_user_id: cancel.cancel_user_id,
                other_details: cancel.other_details,
                schedule_id: cancel.schedule_id,
                session_id: cancel.session_id,
                session_relation_id: cancel.session_relation_id,
                type: cancel.type,
                request_id: null,
              };
            return {
              interview_session_cancel: interview_session_cancel,
              recruiter_user: cancel.interview_session_relation
                ? cancel.interview_session_relation.interview_module_relation
                    .recruiter_user
                : cancel.admin,
            };
          }),
        interview_module: ses.interview_module,
        users: ses.interview_session_relation.map((sesitem) => ({
          interview_session_relation: sesitem,
          interview_module_relation: sesitem.interview_module_relation,
          user_details: sesitem.interview_module_relation_id
            ? sesitem.interview_module_relation.recruiter_user
            : sesitem.debrief_user,
        })),
      };
    });

  return reducedPlan;
};
