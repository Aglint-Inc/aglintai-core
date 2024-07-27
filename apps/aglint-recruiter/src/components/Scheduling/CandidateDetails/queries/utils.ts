import { DatabaseTable, SupabaseType } from '@aglint/shared-types';

import { SessionsType } from '../types';

export const fetchAllActivities = async ({
  application_id,
  supabase,
  session_id,
}: {
  application_id: string;
  supabase: SupabaseType;
  session_id?: string;
}) => {
  const query = supabase
    .from('application_logs')
    .select(
      '*,applications(id,candidates(first_name,last_name,avatar)),recruiter_user(*),new_tasks(task_session_relation(session_id))',
    )
    .eq('application_id', application_id)
    .eq('module', 'scheduler');

  if (session_id) {
    const { data } = await supabase
      .from('new_tasks')
      .select('*,task_session_relation(id)')
      .eq('task_session_relation.session_id', session_id)
      .not('task_session_relation', 'is', null);

    if (data.length === 0) {
      return [];
    } else {
      const taskIds = [...new Set(data.map((item) => item.id))];
      query.in('new_tasks.id', taskIds).not('new_tasks', 'is', null);
    }
  }

  const { data } = await query.throwOnError();

  return data;
};

export const fetchApplicationDetails = async ({
  application_id,
  supabaseCaller,
}: {
  application_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('applications')
    .select(
      `id,job_id,status,candidates(*),public_jobs(id,job_title,location,recruiter!public_jobs_recruiter_id_fkey(id,service_json,google_workspace_domain)),candidate_files(id,file_url,resume_json,type,candidate_id),interview_schedule(id,schedule_name)`,
    )
    .eq('id', application_id)
    .throwOnError();

  return data[0];
};

const userDetails = `recruiter_user(user_id,first_name,last_name,email,profile_image,position,scheduling_settings,schedule_auth)`;
const interviewCancelReasons = `interview_session_cancel(*,interview_session_relation(*,interview_module_relation(*,${userDetails})),admin:${userDetails})`;

export const fetchSessionDetailsFromInterviewPlan = async ({
  job_id,
  supabaseCaller,
}: {
  job_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('interview_plan')
    .select(
      `*,interview_session(*,interview_module(*),interview_meeting(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),${userDetails}))`,
    )
    .eq('job_id', job_id)
    .single()
    .throwOnError();

  if (!data) return [];

  const typedRes: SessionsType[] = data.interview_session.map((item) => {
    const interview_session: DatabaseTable['interview_session'] = {
      id: item.id,
      name: item.name,
      session_order: item.session_order,
      session_duration: item.session_duration,
      schedule_type: item.schedule_type,
      session_type: item.session_type,
      created_at: item.created_at,
      meeting_id: item.meeting_id,
      break_duration: item.break_duration,
      interview_plan_id: item.interview_plan_id,
      interviewer_cnt: item.interviewer_cnt,
      location: item.location,
      members_meta: item.members_meta,
      module_id: item.module_id,
    };

    return {
      interview_session,
      interview_meeting: item.interview_meeting,
      cancel_reasons: [],
      interview_module: item.interview_module,
      users: item.interview_session_relation.map((sesitem) => ({
        interview_session_relation: sesitem,
        interview_module_relation: sesitem.interview_module_relation,
        user_details: sesitem.interview_module_relation_id
          ? sesitem.interview_module_relation.recruiter_user
          : sesitem.recruiter_user,
      })),
    };
  });

  return typedRes;
};

export const fetchSessionDetailsFromSchedule = async ({
  application_id,
  supabaseCaller,
}: {
  application_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('interview_schedule')
    .select(
      `*,interview_meeting(interview_session(*,${interviewCancelReasons},interview_module(*),interview_meeting(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})))`,
    )
    .eq('application_id', application_id)
    .single()
    .throwOnError();

  if (!data) return [];

  const typedRes: SessionsType[] = data.interview_meeting.map((op) => {
    const item = op.interview_session[0];
    const interview_session: DatabaseTable['interview_session'] = {
      id: item.id,
      name: item.name,
      session_order: item.session_order,
      session_duration: item.session_duration,
      schedule_type: item.schedule_type,
      session_type: item.session_type,
      created_at: item.created_at,
      meeting_id: item.meeting_id,
      break_duration: item.break_duration,
      interview_plan_id: item.interview_plan_id,
      interviewer_cnt: item.interviewer_cnt,
      location: item.location,
      members_meta: item.members_meta,
      module_id: item.module_id,
    };

    return {
      interview_session,
      interview_meeting: item.interview_meeting,
      cancel_reasons: item.interview_session_cancel
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
            };
          return {
            interview_session_cancel: interview_session_cancel,
            recruiter_user: cancel.interview_session_relation
              ? cancel.interview_session_relation.interview_module_relation
                  .recruiter_user
              : cancel.admin,
          };
        }),
      interview_module: item.interview_module,
      users: item.interview_session_relation.map((sesitem) => ({
        interview_session_relation: sesitem,
        interview_module_relation: sesitem.interview_module_relation,
        user_details: sesitem.interview_module_relation_id
          ? sesitem.interview_module_relation.recruiter_user
          : sesitem.debrief_user,
      })),
    };
  });

  return typedRes;
};

export const fetchRequestAvailibilities = async ({
  application_id,
  supabaseCaller,
}: {
  application_id: string;
  supabaseCaller: SupabaseType;
}) => {
  const { data } = await supabaseCaller
    .from('candidate_request_availability')
    .select(`*,request_session_relation(*)`)
    .eq('application_id', application_id)
    .eq('booking_confirmed', false)
    .throwOnError();

  return data.map((item) => {
    const candidate_request_availability: DatabaseTable['candidate_request_availability'] =
      {
        application_id: item.application_id,
        id: item.id,
        availability: item.availability,
        booking_confirmed: item.booking_confirmed,
        created_at: item.created_at,
        date_range: item.date_range,
        is_task_created: item.is_task_created,
        number_of_days: item.number_of_days,
        number_of_slots: item.number_of_slots,
        recruiter_id: item.recruiter_id,
        slots: item.slots,
        total_slots: item.total_slots,
        user_timezone: item.user_timezone,
        visited: item.visited,
      };
    return {
      candidate_request_availability,
      request_session_relations: item.request_session_relation,
    };
  });
};
