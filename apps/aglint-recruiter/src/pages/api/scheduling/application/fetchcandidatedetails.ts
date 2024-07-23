/* eslint-disable no-console */
import { DB } from '@aglint/shared-types';
import { CookieOptions, createServerClient, serialize } from '@supabase/ssr';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchApplicationDetails,
  fetchSessionDetailsFromInterviewPlan,
  fetchSessionDetailsFromSchedule,
} from '@/src/components/Scheduling/CandidateDetails/queries/utils';
import { SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';
import { getScheduleName } from '@/src/components/Scheduling/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';

export type ApiCandidateDetails = {
  request: {
    application_id: string;
  };
  response: {
    success: boolean;
    sessions: SchedulingApplication['initialSessions'];
    schedule: SchedulingApplication['selectedSchedule'];
    application: SchedulingApplication['selectedApplication'];
    scheduleName: string;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[String(name)];
          },
          set(name: string, value: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, value, options));
          },
          remove(name: string, options: CookieOptions) {
            res.setHeader('Set-Cookie', serialize(name, '', options));
          },
        },
      },
    );

    const requestHandler = apiRequestHandlerFactory<ApiCandidateDetails>(
      req,
      res,
    );

    requestHandler(
      'POST',
      async ({ requesterDetails, body }) => {
        const { recruiter_id } = requesterDetails;
        const { application_id } = body;

        let scheduleDetail = null;
        let applicationDetail = null;
        let scheduleName = '';
        let sessions = [];

        const { data: recruiter } = await supabase
          .from('recruiter')
          .select('*')
          .eq('id', recruiter_id)
          .single()
          .throwOnError();

        console.log('recruiter', recruiter.id);

        const { data: schedule } = await supabase
          .from('interview_schedule')
          .select('*')
          .eq('application_id', application_id)
          .throwOnError();

        const resApplicationDetails = await fetchApplicationDetails({
          application_id,
          supabaseCaller: supabase,
        });

        if (resApplicationDetails) {
          applicationDetail = resApplicationDetails;
        }

        scheduleDetail = schedule[0];

        if (schedule.length == 0) {
          const resSessionDetails = await fetchSessionDetailsFromInterviewPlan({
            job_id: resApplicationDetails.public_jobs.id,
            supabaseCaller: supabase,
          });

          scheduleName = getScheduleName({
            job_title: resApplicationDetails?.public_jobs?.job_title,
            first_name: resApplicationDetails?.candidates?.first_name,
            last_name: resApplicationDetails?.candidates?.last_name,
          });

          if (resSessionDetails?.length > 0) {
            sessions = resSessionDetails.sort(
              (itemA, itemB) =>
                itemA.interview_session['session_order'] -
                itemB.interview_session['session_order'],
            );
          }
        } else {
          await fetchSessionDetailsFromSchedule({
            application_id,
            supabaseCaller: supabase,
          }).then((sessionsWithPlan) => {
            if (sessionsWithPlan?.length > 0) {
              sessions = sessionsWithPlan.sort(
                (itemA, itemB) =>
                  itemA.interview_session['session_order'] -
                  itemB.interview_session['session_order'],
              );
            }
          });
          scheduleName = scheduleDetail?.schedule_name;
        }

        return {
          success: true,
          sessions,
          schedule: scheduleDetail,
          application: applicationDetail,
          scheduleName,
        };
      },
      ['application_id'],
    );
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;
