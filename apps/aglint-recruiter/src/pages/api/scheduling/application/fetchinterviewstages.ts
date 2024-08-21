/* eslint-disable no-console */
import { DatabaseTable, SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  interviewCancelReasons,
  userDetails,
} from '@/src/components/Scheduling/CandidateDetails/queries/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiInterviewStages = {
  request: {
    application_id: string;
  };
  response: {
    success: boolean;
    stages: Awaited<ReturnType<typeof fetchSessionDetails>>;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const requestHandler = apiRequestHandlerFactory<ApiInterviewStages>(
      req,
      res,
    );

    requestHandler(
      'POST',
      async ({ body }) => {
        const { application_id } = body;
        const stages = await fetchDetails(application_id);
        return {
          success: true,
          stages,
        };
      },
      ['application_id'],
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

const fetchDetails = async (application_id: string) => {
  const [resStages] = await Promise.all([
    fetchSessionDetails({
      application_id,
      supabaseCaller: supabaseAdmin,
    }),
  ]);

  const reducedStages = resStages.map((stage) => {
    const sessions = stage.sessions.map((session) => {
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
    return {
      interview_plan: stage.interview_plan,
      sessions,
    };
  });

  return reducedStages;
};

const fetchSessionDetails = async ({
  application_id,
  supabaseCaller,
}: {
  application_id: string;
  supabaseCaller: SupabaseType;
}) => {
  console.log('asdasd');

  const { data } = await supabaseCaller
    .from('interview_plan')
    .select(
      `*,interview_session(*,interview_meeting(*),${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails}))`,
    )
    .eq('interview_session.interview_meeting.application_id', application_id)
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


// eslint-disable-next-line no-unused-vars
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
