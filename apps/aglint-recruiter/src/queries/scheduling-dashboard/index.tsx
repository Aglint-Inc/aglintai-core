import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type getInterviewTrainingProgressType } from '@/pages/api/scheduling/get_interview_training_progress';
import { supabase } from '@/utils/supabase/client';

import { schedulingDashboardQueryKeys } from './keys';
import {
  type Functions,
  type SchedulingDashboardArgs,
} from './types';

type Args<T extends keyof SchedulingDashboardArgs> = SchedulingDashboardArgs[T];

export const useInterviewMeetingStatus = (
  type: Args<'interviewMeetingStatus'>['type'],
) => {
  const { recruiter_id, enabled, gcTime } = useDashboardEnabled();
  const { queryKey } = schedulingDashboardQueryKeys.interviewMeetingStatusCount(
    {
      recruiter_id,
      type,
    },
  );
  const response = useQuery({
    queryKey,
    enabled,
    gcTime,
    queryFn: () =>
      getInterviewMeetingStatus({
        recruiter_id,
        type,
      }),
  });
  return response;
};

export const useInterviewConversion = (
  type: Args<'interviewConversion'>['type'],
) => {
  const { recruiter_id, enabled, gcTime } = useDashboardEnabled();
  const { queryKey } = schedulingDashboardQueryKeys.interviewConversion({
    recruiter_id,
    type,
  });
  return useQuery({
    queryKey,
    enabled,
    gcTime,
    queryFn: () => getInterviewConversion({ recruiter_id, type }),
  });
};

const useDashboardEnabled = () => {
  const { recruiter, recruiter_id } = useAuthDetails();
  const enabled = !!recruiter && !!recruiter_id;
  return {
    recruiter,
    recruiter_id,
    enabled,
    gcTime: enabled ? 1000 * 60 * 5 : 0,
  };
};

const getInterviewMeetingStatus = async (
  args: Args<'interviewMeetingStatus'>,
) => {
  const data = await rpc('get_interview_meeting_status_count', args);
  return data;
};

const getInterviewConversion = async (args: Args<'interviewConversion'>) => {
  return await rpc('get_conversion_count', args);
};

const rpc = async <T extends keyof Functions, R = Functions[T]['Returns']>(
  func: T,
  params: Functions[T]['Args'],
): Promise<R> => {
  const { data, error } = await supabase.rpc(func, params);
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Something went wrong');
  return data as R;
};

export const getInterviewTrainingProgressAPI = async ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  return (
    await axios.get(
      `/api/scheduling/get_interview_training_progress?recruiter_id=${recruiter_id}`,
    )
  ).data as ReturnType<getInterviewTrainingProgressType>;
};
