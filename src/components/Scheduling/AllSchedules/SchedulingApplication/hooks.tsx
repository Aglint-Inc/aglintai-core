import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
dayjs.extend(utc);
dayjs.extend(timezone);

import { createServerClient } from '@supabase/ssr';

import { EmailAgentId, PhoneAgentId } from '@/src/components/Tasks/utils';
import {
  InterviewMeetingTypeDb,
  InterviewPlanTypeDB,
  InterviewScheduleActivityTypeDb,
  InterviewSessionTypeDB,
} from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../queries/utils';
import {
  SchedulingApplication,
  setFetchingSchedule,
  setinitialSessions,
  setScheduleName,
  setSelCoordinator,
  setSelectedApplication,
  setSelectedSchedule,
} from './store';
import {
  ApplicationDataResponseType,
  InterviewDataResponseType,
} from './types';
import { agentTrigger, createCloneSession } from './utils';

//

export const useGetScheduleApplication = () => {
  const router = useRouter();
  const fetchInterviewDataByApplication = async () => {
    try {
      const { data: schedule, error } = await supabase
        .from('interview_schedule')
        .select('*')
        .eq('application_id', router.query.application_id);

      if (!error) {
        setSelectedSchedule(schedule[0]);

        if (schedule.length == 0) {
          const sessionsWithPlan = await fetchInterviewDataJob({
            application_id: router.query.application_id as string,
            supabase,
          });

          setSelectedApplication(sessionsWithPlan.application);
          setScheduleName(
            `Interview for ${sessionsWithPlan.application?.public_jobs?.job_title} - ${sessionsWithPlan.application?.candidates?.first_name}`,
          );
          if (sessionsWithPlan.sessions.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );

            if (sessionsWithPlan?.interviewPlan?.coordinator_id) {
              setSelCoordinator(
                sessionsWithPlan?.interviewPlan?.coordinator_id,
              );
            }
          }
        } else {
          const sessionsWithPlan = await fetchInterviewDataSchedule(
            schedule[0].id,
            router.query.application_id as string,
            supabase,
          );
          setSelectedApplication(sessionsWithPlan.application);

          if (sessionsWithPlan.sessions.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );

            setScheduleName(schedule[0].schedule_name);
            if (schedule[0].coordinator_id) {
              setSelCoordinator(schedule[0].coordinator_id);
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFetchingSchedule(false);
    }
  };
  return { fetchInterviewDataByApplication };
};

export const fetchInterviewDataJob = async ({
  application_id,
  supabase,
}: {
  application_id: string;
  supabase: ReturnType<typeof createServerClient<Database>>;
}) => {
  try {
    const { data, error } = (await supabase.rpc('get_interview_data_job', {
      application_id_param: application_id,
    })) as {
      data: {
        interview_data: InterviewDataResponseType[];
        interview_plan_data: InterviewPlanTypeDB;
        application_data: ApplicationDataResponseType;
      };
      error: any;
    };

    if (error) throw new Error(error.message);

    const sessions =
      data.interview_data?.map((item) => ({
        ...item.interview_session,
        interview_meeting: null as InterviewMeetingTypeDb,
        interview_module: item.interview_module,
        users: item.interview_session_relations?.interview_module_relation?.map(
          (sesitem) => ({
            ...sesitem.interview_session_relation,
            interview_module_relation: {
              ...sesitem.interview_module_relation,
              recruiter_user: sesitem.recruiter_user,
            },
            recruiter_user: sesitem.debrief_user,
          }),
        ),
      })) || [];

    return {
      sessions: sessions,
      interviewPlan: data.interview_plan_data,
      application: {
        ...data.application_data.application,
        candidate_files: data.application_data.candidate_files,
        candidates: data.application_data.candidate,
        public_jobs: data.application_data.public_jobs,
      } as SchedulingApplication['selectedApplication'],
    };
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewDataSchedule = async (
  schedule_id: string,
  application_id: string,
  supabase: ReturnType<typeof createServerClient<Database>>,
) => {
  try {
    const { data, error } = (await supabase.rpc('get_interview_data_schedule', {
      schedule_id_param: schedule_id,
      application_id_param: application_id,
    })) as {
      data: {
        interview_data: InterviewDataResponseType[];
        application_data: ApplicationDataResponseType;
        schedule_activity_data: InterviewScheduleActivityTypeDb[];
      };
      error: any;
    };

    if (error) throw new Error(error.message);

    const sessions = data.interview_data?.map((item) => ({
      ...item.interview_session,
      interview_meeting: item.interview_meeting,
      interview_module: item.interview_module,
      users:
        item.interview_session_relations?.interview_module_relation?.map(
          (sesitem) => ({
            ...sesitem.interview_session_relation,
            interview_module_relation: {
              ...sesitem.interview_module_relation,
              recruiter_user: sesitem.recruiter_user,
            },
            recruiter_user: sesitem.debrief_user,
          }),
        ) || [],
    }));

    return {
      sessions: sessions,
      application: {
        ...data.application_data?.application,
        candidate_files: data.application_data?.candidate_files,
        candidates: data.application_data?.candidate,
        public_jobs: data.application_data?.public_jobs,
      } as SchedulingApplication['selectedApplication'],
    };
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewSessionTask = async ({
  job_id,
  application_id,
}: {
  job_id: string;
  application_id: string;
}) => {
  try {
    const { data: schedule, error } = await supabase
      .from('interview_schedule')
      .select('*')
      .eq('application_id', application_id);

    if (error) throw new Error(error.message);

    if (schedule.length == 0) {
      const { data: interviewSession, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select('*,interview_module(*),interview_plan!inner(*)')
          .eq('interview_plan.job_id', job_id)
          .neq('session_type', 'debrief');

      if (interviewSessionError) throw new Error(interviewSessionError.message);
      const sessions = interviewSession.map(
        (meet) =>
          ({
            break_duration: meet.break_duration,
            created_at: meet.created_at,
            id: meet.id,
            interview_plan_id: meet.interview_plan_id,
            interviewer_cnt: meet.interviewer_cnt,
            location: meet.location,
            module_id: meet.module_id,
            name: meet.name,
            schedule_type: meet.schedule_type,
            session_duration: meet.session_duration,
            session_order: meet.session_order,
            session_type: meet.session_type,
          }) as InterviewSessionTypeDB,
      );

      return sessions.sort(
        (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
      ) as InterviewSessionTypeDB[];
    } else {
      const { data: interviewSessions, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select('*,interview_meeting!inner(*,interview_schedule(*))')
          .eq('interview_meeting.interview_schedule_id', schedule[0].id)
          .neq('session_type', 'debrief')
          .eq('interview_meeting.status', 'not_scheduled');

      if (interviewSessionError) throw new Error(interviewSessionError.message);

      return interviewSessions.sort(
        (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
      ) as InterviewSessionTypeDB[];
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const scheduleWithAgent = async ({
  type,
  session_ids,
  application_id,
  dateRange,
  recruiter_id,
  task_id,
  recruiter_user_name,
  candidate_name = 'chinmai',
  company_name = 'aglint',
  rec_user_email,
  rec_user_phone,
  rec_user_id,
  supabase,
  user_tz,
}: {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  task_id: string;
  recruiter_user_name: string;
  candidate_name?: string;
  company_name?: string;
  rec_user_email: string;
  rec_user_phone: string;
  rec_user_id: string;
  supabase: ReturnType<typeof createServerClient<Database>>;
  user_tz: string;
}) => {
  try {
    if (type) {
      const assignee = type == 'email_agent' ? [EmailAgentId] : [PhoneAgentId];

      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', application_id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const sessionsWithPlan = await fetchInterviewDataJob({
          application_id,
          supabase,
        });

        const scheduleName = `Interview for ${sessionsWithPlan.application.public_jobs.job_title} - ${sessionsWithPlan.application.candidates.first_name}`;

        const createCloneRes = await createCloneSession({
          is_get_more_option: false,
          application_id,
          allSessions: sessionsWithPlan.sessions,
          session_ids,
          scheduleName,
          coordinator_id: sessionsWithPlan.interviewPlan.coordinator_id,
          supabase,
          recruiter_id: recruiter_id,
          rec_user_id,
        });

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: createCloneRes.session_ids,
              recruiter_id: recruiter_id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: user_tz,
              organizer_name: recruiter_user_name,
            },
            session_ids: createCloneRes.session_ids,
            schedule_id: createCloneRes.schedule.id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        if (task_id) {
          const { error: eroorSubTasks } = await supabase
            .from('new_tasks')
            .update({
              filter_id: filterJson[0].id,
              session_ids: createCloneRes.refSessions.filter(
                (ses) => ses.isSelected,
              ),
              task_triggered: true,
            })
            .eq('id', task_id);
          if (eroorSubTasks) throw new Error(eroorSubTasks.message);

          addScheduleActivity({
            title: `Candidate invited for session ${createCloneRes.refSessions
              .filter((ses) => ses.isSelected)
              .map((ses) => ses.name)
              .join(
                ' , ',
              )} via ${type === 'email_agent' ? 'Email Agent' : 'Phone Agent'}`,
            logger: rec_user_id,
            type: 'schedule',
            application_id,
            task_id,
            supabase,
          });

          agentTrigger({
            type,
            sessionsWithPlan,
            filterJsonId: filterJson[0].id,
            task_id,
            recruiter_user_name,
            candidate_name,
            company_name,
            jobRole: sessionsWithPlan.application.public_jobs.job_title,
            rec_user_email,
            rec_user_phone,
            user_tz,
          });
        } else {
          const { data: task, error: errorTasks } = await supabase
            .from('new_tasks')
            .insert({
              name: `Schedule an interview for ${createCloneRes.refSessions.map((ses) => ses.name).join(' , ')} via phone`,
              application_id,
              created_by: rec_user_id,
              type: 'schedule',
              status: 'in_progress',
              recruiter_id,
              due_date: dateRange.end_date,
              schedule_date_range: dateRange,
              start_date: new Date(),
              assignee,
              filter_id: filterJson[0].id,
              session_ids: createCloneRes.refSessions,
              task_triggered: true,
            } as any)
            .select();

          if (errorTasks) throw new Error(errorTasks.message);

          addScheduleActivity({
            title: `Candidate invited for session ${createCloneRes.refSessions
              .filter((ses) => ses.isSelected)
              .map((ses) => ses.name)
              .join(
                ' , ',
              )} via ${type === 'email_agent' ? 'Email Agent' : 'Phone Agent'}`,
            logger: rec_user_id,
            type: 'schedule',
            application_id,
            task_id: task[0].id,
            supabase,
          });

          agentTrigger({
            type,
            sessionsWithPlan,
            filterJsonId: filterJson[0].id,
            task_id: task[0].id,
            recruiter_user_name,
            candidate_name,
            company_name,
            jobRole: sessionsWithPlan.application.public_jobs.job_title,
            rec_user_email,
            rec_user_phone,
            user_tz,
          });
        }
      } else {
        const sessionsWithPlan = await fetchInterviewDataSchedule(
          checkSch[0].id,
          application_id,
          supabase,
        );

        const selectedSessions = sessionsWithPlan.sessions.filter((ses) =>
          session_ids.includes(ses.id),
        );

        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert(
            selectedSessions.map((ses) => ({
              status: 'waiting',
              id: ses.interview_meeting.id,
              interview_schedule_id:
                ses.interview_meeting.interview_schedule_id,
            })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: session_ids,
              recruiter_id: recruiter_id,
              start_date:
                dateRange.start_date &&
                dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date:
                dateRange.end_date &&
                dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: user_tz,
              organizer_name: recruiter_user_name,
            },
            session_ids: session_ids,
            schedule_id: checkSch[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        if (task_id) {
          const { error: eroorSubTasks } = await supabase
            .from('new_tasks')
            .update({
              filter_id: filterJson[0].id,
              session_ids: sessionsWithPlan.sessions,
              task_triggered: true,
            })
            .eq('id', task_id);
          if (eroorSubTasks) throw new Error(eroorSubTasks.message);

          addScheduleActivity({
            title: `Candidate invited for session ${selectedSessions
              .map((ses) => ses.name)
              .join(
                ' , ',
              )} via ${type === 'email_agent' ? 'Email Agent' : 'Phone Agent'}`,
            logger: rec_user_id,
            type: 'schedule',
            application_id,
            task_id,
            supabase,
          });

          agentTrigger({
            type,
            sessionsWithPlan,
            filterJsonId: filterJson[0].id,
            task_id,
            recruiter_user_name,
            candidate_name,
            company_name,
            jobRole: sessionsWithPlan.application.public_jobs.job_title,
            rec_user_email,
            rec_user_phone,
            user_tz,
          });
        } else {
          const { data: task, error: errorTasks } = await supabase
            .from('new_tasks')
            .insert({
              name: `Schedule an interview for ${selectedSessions.map((ses) => ses.name).join(' , ')} via phone`,
              application_id,
              created_by: rec_user_id,
              type: 'schedule',
              status: 'in_progress',
              recruiter_id,
              due_date: dateRange.end_date,
              schedule_date_range: dateRange,
              start_date: new Date(),
              assignee,
              filter_id: filterJson[0].id,
              session_ids: selectedSessions,
              task_triggered: true,
            } as any)
            .select();

          if (errorTasks) throw new Error(errorTasks.message);

          addScheduleActivity({
            title: `Candidate invited for session ${selectedSessions
              .map((ses) => ses.name)
              .join(
                ' , ',
              )} via ${type === 'email_agent' ? 'Email Agent' : 'Phone Agent'}`,
            logger: rec_user_id,
            type: 'schedule',
            application_id,
            task_id: task[0].id,
            supabase,
          });

          agentTrigger({
            type,
            sessionsWithPlan,
            filterJsonId: filterJson[0].id,
            task_id: task[0].id,
            recruiter_user_name,
            candidate_name,
            company_name,
            jobRole: sessionsWithPlan.application.public_jobs.job_title,
            rec_user_email,
            rec_user_phone,
            user_tz,
          });
        }
      }
      return true;
    }
  } catch (e) {
    toast.error(e.message);
  }
};
