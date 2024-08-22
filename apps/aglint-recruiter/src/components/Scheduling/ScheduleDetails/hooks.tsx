import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import {
  interviewCancelReasons,
  userDetails,
} from '../CandidateDetails/queries/utils';
import { MemberType } from '../InterviewTypes/types';

export const useScheduleDetails = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = useQuery({
    queryKey: ['schedule_details', router?.query?.meeting_id],
    queryFn: async () => await getSchedule(router?.query?.meeting_id as string),
    enabled: !!router?.query?.meeting_id,
  });
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', router?.query?.meeting_id],
    });
  };
  return { ...query, refetch };
};

export type ScheduleDetailsType = Awaited<ReturnType<typeof getSchedule>>;

async function getSchedule(meeting_id: string) {
  const { data: res } = await supabase
    .from('interview_meeting')
    .select(
      `*,organizer:recruiter_user(*),interview_session(*,${interviewCancelReasons},interview_module(*),interview_session_relation(*,interview_module_relation(*,${userDetails}),debrief_user:${userDetails})),interview_schedule(*),applications(*,public_jobs(id,job_title,description,hir_man:recruiter_user!public_jobs_hiring_manager_fkey(*),rec:recruiter_user!public_jobs_recruiter_fkey(*),rec_cor:recruiter_user!public_jobs_recruiting_coordinator_fkey(*)),candidates(*))`,
    )
    .eq('id', meeting_id)
    .single();

  return {
    schedule_data: {
      interview_module: res.interview_session[0].interview_module,
      interview_session: res.interview_session[0],
      application_id: res.application_id,
      candidates: res.applications.candidates,
      schedule: res.interview_schedule,
      hiring_manager: res.applications.public_jobs.hir_man,
      recruiter: res.applications.public_jobs.rec,
      interview_meeting: {
        application_id: res.application_id,
        created_at: res.created_at,
        id: res.id,
        interview_schedule_id: res.interview_schedule_id,
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
            schedule_id: cancel.schedule_id,
            session_id: cancel.session_id,
            session_relation_id: cancel.session_relation_id,
            type: cancel.type,
            request_id: cancel.request_id,
          },
          interview_session_relation: cancel?.interview_session_relation,
          recruiter_user:
            cancel.interview_session_relation?.interview_module_relation
              ?.recruiter_user,
        };
      },
    ),
  };
}

export const useModuleDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['module_details'],
    queryFn: () => getModule(router?.query?.module_id as string),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['module_details'] });
  return { ...query, refetch };
};

async function getModule(module_id: string) {
  const { data, error } = await supabase
    .from('interview_module')
    .select()
    .eq('id', module_id)
    .single();
  if (!error) {
    return data;
  }
  if (error) throw Error(error.message);
}

export const useAllInterviewersDetails = () => {
  const { recruiter_id } = useAuthDetails();
  const query = useQuery({
    queryKey: [`InterviewModulesDetails_${recruiter_id}`],
    queryFn: () => {
      return axios
        .post('/api/scheduling/fetchUserDetails', {
          recruiter_id,
        })
        .then((data) => {
          const temp = data.data as unknown as MemberType[];
          return temp;
        });
    },
    enabled: Boolean(recruiter_id),
    refetchOnWindowFocus: false,
  });
  return query;
};
