/* eslint-disable no-console */
import { type DatabaseTable, type SupabaseType } from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { interviewCancelReasons, userDetails } from '@/utils/scheduling/const';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

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
    const { request_id } = req.body as ApiInterviewSessionRequest['request'];
    const sessions = await fetchDetails(request_id);
    return res.status(200).send({
      success: true,
      sessions,
    });
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
    .filter((ses) => ses !== null)
    .map((ses) => {
      const interview_session: DatabaseTable['interview_session'] = {
        break_duration: ses.break_duration,
        created_at: ses.created_at,
        id: ses.id,
        interview_plan_id: ses.interview_plan_id,
        interviewer_cnt: ses.interviewer_cnt,
        location: ses.location,
        meeting_id: ses.meeting_id,
        members_meta: ses.members_meta,
        module_id: ses.module_id,
        name: ses.name,
        parent_session_id: ses.parent_session_id,
        recruiter_id: ses.recruiter_id,
        schedule_type: ses.schedule_type,
        session_duration: ses.session_duration,
        session_order: ses.session_order,
        session_type: ses.session_type,
      };
      return {
        interview_session,
        interview_meeting: ses.interview_meeting!,
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
                session_id: cancel.session_id,
                session_relation_id: cancel.session_relation_id,
                type: cancel.type,
                request_id: cancel.request_id,
                application_id: cancel.application_id,
              };
            return {
              interview_session_cancel: interview_session_cancel!,
              recruiter_user: cancel.interview_session_relation
                ? cancel?.interview_session_relation?.interview_module_relation
                    ?.recruiter_user
                : cancel.admin!,
            };
          }),
        interview_module: ses.interview_module!,
        users:
          ses.interview_session_relation.map((sesitem) => ({
            interview_session_relation: sesitem!,
            interview_module_relation: sesitem.interview_module_relation,
            user_details: sesitem.interview_module_relation_id
              ? sesitem?.interview_module_relation?.recruiter_user
              : sesitem.debrief_user!,
          })) || [],
      };
    });

  return reducedPlan;
};
