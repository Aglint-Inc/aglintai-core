import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { interviewCancelReasons, userDetails } from '@/utils/scheduling/const';

export const scheduleDetailsSchema = z.object({
  meeting_id: z.string().uuid(),
});

const query = async ({
  ctx,
  input: { meeting_id },
}: PrivateProcedure<typeof scheduleDetailsSchema>) => {
  const db = ctx.db;
  const { data: res } = await db
    .from('interview_meeting')
    .select(
      `*,organizer:recruiter_user(*),interview_session!inner(*,${interviewCancelReasons},interview_module!inner(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})),applications!inner(*,public_jobs!inner(id,job_title,description,departments(name),office_locations(country,city),hir_man:recruiter_user!public_jobs_hiring_manager_fkey(*),rec:recruiter_user!public_jobs_recruiter_fkey(*),rec_cor:recruiter_user!public_jobs_recruiting_coordinator_fkey(*)),candidates!inner(*))`,
    )
    .eq('id', meeting_id)
    .single()
    .throwOnError();

  if (!res) {
    throw new Error('Schedule not found.');
  }

  const { applications, organizer, interview_session, ...interview_meeting } =
    res;
  const {
    interview_session_relation,
    interview_session_cancel,
    interview_module,
    ...int_ses
  } = interview_session[0];

  const { public_jobs, candidates, ...app } = applications;

  return {
    schedule_data: {
      interview_module,
      interview_session: int_ses,
      application_id: app.id,
      candidates,
      hiring_manager: public_jobs.hir_man,
      recruiter: public_jobs.rec,
      interview_meeting,
      job: public_jobs,
      organizer,
      recruiting_coordinator: public_jobs.rec_cor,
      sourcer: null,
      users: interview_session_relation.map((sesitem) => ({
        interview_session_relation: sesitem,
        interview_module_relation: sesitem.interview_module_relation,
        user_details: (sesitem.interview_module_relation_id
          ? sesitem?.interview_module_relation?.recruiter_user
          : sesitem.debrief_user)!,
      })),
    },
    cancel_data: interview_session_cancel.map((cancel) => {
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
    }),
  };
};

export const scheduleDetails = privateProcedure
  .input(scheduleDetailsSchema)
  .query(query);

export type ScheduleDetails = ProcedureDefinition<typeof scheduleDetails>;
