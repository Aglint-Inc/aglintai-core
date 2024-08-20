/* eslint-disable no-console */
import { DatabaseTable, SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  interviewCancelReasons,
  userDetails,
} from '@/src/components/Scheduling/CandidateDetails/queries/utils';
import { BannerType } from '@/src/components/Scheduling/CandidateDetails/types';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { getFullName } from '@/src/utils/jsonResume';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiInterviewSessionsStage = {
  request: {
    application_id: string;
    sessions_ids: string[];
  };
  response: {
    success: boolean;
    stage: Awaited<ReturnType<typeof fetchSessionDetails>>[number];
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestHandler = apiRequestHandlerFactory<ApiInterviewSessionsStage>(
      req,
      res,
    );

    requestHandler(
      'POST',
      async ({ body }) => {
        const { application_id, sessions_ids } = body;
        const stage = await fetchDetails(application_id, sessions_ids);
        return {
          success: true,
          stage,
        };
      },
      ['application_id', 'sessions_ids'],
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchDetails = async (application_id: string, session_ids: string[]) => {
  const [resApplicationDetails, resStages] = await Promise.all([
    fetchApplicationDetails({
      application_id,
      supabaseCaller: supabaseAdmin,
    }),
    fetchSessionDetails({
      session_ids,
      supabaseCaller: supabaseAdmin,
    }),
  ]);

  const recruiter = resApplicationDetails?.public_jobs?.recruiter;

  const reducedStages = resStages.map((stage) => {
    const sessions = stage.sessions.map((session) => {
      let banners: BannerType[] = [];
      if (session.users.length === 0) {
        banners.push({
          type: 'no_interviewers',
          message: 'No Interviewers',
          color: 'error',
          session_relation_id: null,
          user_id: null,
          user_message: 'No interviewers assigned to this stage.',
        });
      }
      return {
        ...session,
        banners,
        users: session.users.map((user) => {
          const pause_json = user.interview_module_relation?.pause_json;
          const isPaused = !!pause_json; //null check needed because debrief doesnt have module relation
          const isCalendarConnected =
            (!!recruiter.integrations.service_json &&
              recruiter.integrations.google_workspace_domain.split('//')[1] ===
                user.user_details.email.split('@')[1]) ||
            !!(user.user_details.schedule_auth as any)?.access_token;
          if (!isCalendarConnected) {
            banners.push({
              type: 'calender',
              message: 'Calendar Not Connected',
              color: 'error',
              session_relation_id: user.interview_session_relation.id,
              user_id: user.user_details.user_id,
              user_message: `${getFullName(user.user_details.first_name, user.user_details.last_name)}'s calendar is not connected.`,
            });
          }
          if (isPaused) {
            banners.push({
              type: 'paused',
              message: 'Interviewer Paused',
              color: 'warning',
              session_relation_id: user.interview_session_relation.id,
              user_id: user.user_details.user_id,
              user_message: `${getFullName(user.user_details.first_name, user.user_details.last_name)} is paused.`,
            });
          }
          return {
            ...user,
            user_details: {
              ...user.user_details,
            },
          };
        }),
      };
    });
    return {
      interview_plan: stage.interview_plan,
      sessions,
    };
  });

  return reducedStages[0];
};

const fetchSessionDetails = async ({
  session_ids,
  supabaseCaller,
}: {
  session_ids: string[];
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('interview_plan')
    .select(
      `*,interview_session(*,interview_meeting(*),${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails}))`,
    )
    .in('interview_session.id', session_ids)
    .not('interview_session', 'is', null)
    .not('interview_session.interview_meeting', 'is', null);

  if (!data) return [];

  const reducedPlan = data.map((op) => {
    const plan: DatabaseTable['interview_plan'] = {
      created_at: op.created_at,
      id: op.id,
      job_id: op.job_id,
      name: op.name,
      plan_order: op.plan_order,
    };
    const sessions = op.interview_session.map((ses) => {
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
    return {
      interview_plan: plan,
      sessions,
    };
  });

  return reducedPlan;
};

const fetchApplicationDetails = async ({
  application_id,
  supabaseCaller,
}: {
  application_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('applications')
    .select(
      `id,public_jobs(recruiter!public_jobs_recruiter_id_fkey(id,integrations(service_json,google_workspace_domain))),interview_schedule(id,schedule_name)`,
    )
    .eq('id', application_id)
    .throwOnError();

  return data[0];
};
