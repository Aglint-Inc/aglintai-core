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
import { BannerType } from '@/src/components/Scheduling/CandidateDetails/types';
import { getScheduleName } from '@/src/components/Scheduling/utils';
import { apiRequestHandlerFactory } from '@/src/utils/apiUtils/responseFactory';
import { getFullName } from '@/src/utils/jsonResume';

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
      async ({ body }) => {
        const { application_id } = body;

        let scheduleDetail = null;
        let applicationDetail: SchedulingApplication['selectedApplication'] =
          null;
        let scheduleName = '';
        let sessions: SchedulingApplication['initialSessions'] = [];

        const resApplicationDetails = await fetchApplicationDetails({
          application_id,
          supabaseCaller: supabase,
        });

        if (resApplicationDetails) {
          applicationDetail = resApplicationDetails;
          scheduleDetail = resApplicationDetails.interview_schedule;
        } else {
          return {
            success: false,
            sessions: [],
            schedule: null,
            application: null,
            scheduleName: '',
          };
        }

        const recruiter = resApplicationDetails?.public_jobs?.recruiter;

        if (!resApplicationDetails.interview_schedule?.id) {
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
        sessions = sessions.map((session) => {
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
                (!!recruiter.service_json &&
                  recruiter.google_workspace_domain.split('//')[1] ===
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
