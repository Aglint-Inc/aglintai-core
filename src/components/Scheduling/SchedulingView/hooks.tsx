import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { MemberType, TransformSchedule } from '../Modules/types';

export const useScheduleDetails = () => {
  const router = useRouter();
  const query = useQuery({
    queryKey: ['schedule_details', router?.query?.meeting_id],
    queryFn: () => getSchedule(router?.query?.meeting_id as string),
    enabled: !!router?.query?.meeting_id,
    refetchOnWindowFocus: false,
  });
  return query;
};

async function getSchedule(meeting_id: string) {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_meeting_id',
    {
      target_meeting_id: meeting_id as string,
    },
  );
  if (data.length > 0) {
    if (error) throw Error(error.message);
    else return data[0] as unknown as TransformSchedule;
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
    initialData: () => [] as unknown as MemberType[],
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
  return query;
};
