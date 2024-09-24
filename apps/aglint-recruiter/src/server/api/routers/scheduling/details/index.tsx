import {
  interviewCancelReasons,
  userDetails,
} from 'src/app/_common/utils/const';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const scheduleDetailsSchema = z.object({
  meeting_id: z.string().uuid(),
});

const query = async ({
  input: { meeting_id },
}: PrivateProcedure<typeof scheduleDetailsSchema>) => {
  const db = createPrivateClient();
  const { data: res } = await db
    .from('interview_meeting')
    .select(
      `*,organizer:recruiter_user(*),interview_session(*,${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})),applications(*,public_jobs(id,job_title,description,departments(name),office_locations(country,city),hir_man:recruiter_user!public_jobs_hiring_manager_fkey(*),rec:recruiter_user!public_jobs_recruiter_fkey(*),rec_cor:recruiter_user!public_jobs_recruiting_coordinator_fkey(*)),candidates(*))`,
    )
    .eq('id', meeting_id)
    .single()
    .throwOnError();

  return {
    schedule_data: {
      interview_module: res.interview_session[0].interview_module,
      interview_session: res.interview_session[0],
      application_id: res.application_id,
      candidates: res.applications.candidates,
      hiring_manager: res.applications.public_jobs.hir_man,
      recruiter: res.applications.public_jobs.rec,
      interview_meeting: {
        application_id: res.application_id,
        created_at: res.created_at,
        id: res.id,
        cal_event_id: res.cal_event_id,
        candidate_feedback: res.candidate_feedback,
        confirmed_date: res.confirmed_date,
        end_time: res.end_time,
        instructions: res.instructions,
        meeting_flow: res.meeting_flow,
        meeting_json: res.meeting_json,
        meeting_link: res.meeting_link,
        organizer_id: res.organizer_id,
        start_time: res.start_time,
        status: res.status,
      },
      job: res.applications.public_jobs,
      organizer: res.organizer,
      recruiting_coordinator: res.applications.public_jobs.rec_cor,
      sourcer: null,
      users: res.interview_session[0].interview_session_relation.map(
        (sesitem) => ({
          interview_session_relation: sesitem,
          interview_module_relation: sesitem.interview_module_relation,
          user_details: sesitem.interview_module_relation_id
            ? sesitem.interview_module_relation.recruiter_user
            : sesitem.debrief_user,
        }),
      ),
    },
    cancel_data: res.interview_session[0].interview_session_cancel.map(
      (cancel) => {
        return {
          interview_session_cancel: {
            cancel_user_id: cancel.cancel_user_id,
            created_at: cancel.created_at,
            id: cancel.id,
            is_ignored: cancel.is_ignored,
            is_resolved: cancel.is_resolved,
            other_details: cancel.other_details,
            reason: cancel.reason,
            session_id: cancel.session_id,
            session_relation_id: cancel.session_relation_id,
            type: cancel.type,
            request_id: cancel.request_id,
            application_id: cancel.application_id,
          },
          interview_session_relation: cancel?.interview_session_relation,
          recruiter_user:
            cancel.interview_session_relation?.interview_module_relation
              ?.recruiter_user,
        };
      },
    ),
  };
};

export const scheduleDetails = privateProcedure
  .input(scheduleDetailsSchema)
  .query(query);
