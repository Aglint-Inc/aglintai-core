import { DatabaseTable } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { MemberType } from '../InterviewTypes/types';
import { ScheduleMeeting } from './types';

export const useScheduleDetails = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const query = useQuery({
    queryKey: ['schedule_details', router?.query?.meeting_id],
    queryFn: () => getSchedule(router?.query?.meeting_id as string),
    enabled: !!router?.query?.meeting_id,
  });
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', router?.query?.meeting_id],
    });
  };
  return { ...query, refetch };
};

async function getSchedule(meeting_id: string) {
  const { data, error } = await supabase.rpc(
    'new_get_interview_schedule_by_meeting_id',
    {
      target_meeting_id: meeting_id as string,
    },
  );
  if (data) {
    if (error) throw Error(error.message);
    else
      return data as unknown as {
        schedule_data: ScheduleMeeting;
        cancel_data: {
          interview_session_cancel: DatabaseTable['interview_session_cancel'];
          interview_session_relation: DatabaseTable['interview_session_relation'];
          recruiter_user: {
            id: string;
            first_name: string;
            last_name: string;
            email: string;
            profile_image: string;
            position: string;
          };
          candidate: DatabaseTable['candidates'];
        }[];
      };
  }
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
