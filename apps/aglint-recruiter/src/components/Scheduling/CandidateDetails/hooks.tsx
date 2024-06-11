import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  DatabaseTable,
  DB,
  InterviewMeetingTypeDb,
  InterviewPlanTypeDB,
  SupabaseType,
} from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { ApiResponseActivities } from '@/src/pages/api/scheduling/fetch_activities';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { getScheduleName } from '../utils';
import {
  SchedulingApplication,
  setAvailabilities,
  setFetchingSchedule,
  setinitialSessions,
  setScheduleName,
  setSelectedApplication,
  setSelectedSchedule,
} from './store';
import {
  ApplicationDataResponseType,
  InterviewDataResponseType,
} from './types';

export const useAllActivities = ({ application_id }) => {
  const queryClient = useQueryClient();
  const queryKey = ['activitiesCandidate', { application_id }];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data: resAct, status }: AxiosResponse<ApiResponseActivities> =
        await axios.post('/api/scheduling/fetch_activities', {
          application_id,
        });
      if (status !== 200) {
        toast.error('Unable to fetch activities');
      }
      return resAct.data;
    },
    enabled: !!application_id,
    initialData: [],
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...query, refetch };
};

export const fetchAllActivities = async ({
  application_id,
  supabase,
}: {
  application_id: string;
  supabase: SupabaseType;
}) => {
  const { data, error } = await supabase
    .from('application_logs')
    .select(
      '*,applications(id,candidates(first_name,last_name,avatar)),recruiter_user(*)',
    )
    .eq('application_id', application_id)
    .order('created_at', {
      ascending: true,
    });

  if (error) throw new Error(error.message);

  return data;
};

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
            getScheduleName({
              job_title: sessionsWithPlan.application?.public_jobs?.job_title,
              first_name: sessionsWithPlan.application?.candidates?.first_name,
              last_name: sessionsWithPlan.application?.candidates?.last_name,
            }),
          );
          if (sessionsWithPlan?.sessions?.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );
          }
        } else {
          const sessionsWithPlan = await fetchInterviewDataSchedule(
            schedule[0].id,
            router.query.application_id as string,
            supabase,
          );
          setAvailabilities(sessionsWithPlan.availabilities);
          setSelectedApplication(sessionsWithPlan.application);
          setScheduleName(schedule[0].schedule_name);
          if (sessionsWithPlan?.sessions?.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );
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
  supabase: ReturnType<typeof createServerClient<DB>>;
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
  supabase: ReturnType<typeof createServerClient<DB>>,
) => {
  try {
    const { data, error } = (await supabase.rpc('get_interview_data_schedule', {
      schedule_id_param: schedule_id,
      application_id_param: application_id,
    })) as {
      data: {
        interview_data: InterviewDataResponseType[];
        application_data: ApplicationDataResponseType;
        request_data: DatabaseTable['candidate_request_availability'][];
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
      availabilities: data.request_data,
    };
  } catch (e) {
    toast.error(e.message);
  }
};
