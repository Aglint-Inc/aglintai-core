import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { SupabaseType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import { interviewPlanRecruiterUserQuery } from '../company-members';
import { schedulingDashboardQueryKeys } from './keys';
import {
  Functions,
  SchedulingDashboardArgs,
  SchedulingDashboardTypes,
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

export const useInterviewTrainingProgress = () => {
  const { recruiter_id, enabled, gcTime } = useDashboardEnabled();
  const { queryKey } = schedulingDashboardQueryKeys.interviewTrainingProgress({
    recruiter_id,
  });
  return useQuery({
    queryKey,
    enabled,
    gcTime,
    queryFn: async () => {
      const res = await axios.post(
        '/api/scheduling/get_interview_training_progress',
        {
          recruiter_id,
        },
      );
      return res.data;
    },
  });
};

export const useInterviewTrainingStatus = () => {
  const { recruiter_id, enabled, gcTime } = useDashboardEnabled();
  const { queryKey } = schedulingDashboardQueryKeys.interviewTrainingStatus({
    recruiter_id,
  });
  return useQuery({
    queryKey,
    enabled,
    gcTime,
    queryFn: () => getInterviewTrainingStatus({ recruiter_id }),
  });
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

export const useInterviewLeaderboard = (
  type: Args<'interviewLeaderBoard'>['type'],
) => {
  const { recruiter_id, enabled, gcTime } = useDashboardEnabled();
  const { queryKey } = schedulingDashboardQueryKeys.interviewLeaderboard({
    recruiter_id,
    type,
  });
  const response = useQuery({
    queryKey,
    enabled,
    gcTime,
    queryFn: () =>
      rpc('get_interview_leaderboard', {
        recruiter_id,
        type,
      }),
  });
  return response;
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

const getInterviewTrainingStatus = async (
  args: Args<'interviewTrainingStatus'>,
) => {
  const data = await rpc<'get_interview_training_status_count'>(
    'get_interview_training_status_count',
    args,
  );
  return data as SchedulingDashboardTypes['interviewTrainingStatus'];
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

export const getInterviewTrainingProgress = async ({
  recruiter_id,
  supabase,
}: {
  recruiter_id: string;
  supabase: SupabaseType;
}) => {
  const { data, error } = await supabase
    .from('interview_module')
    .select(
      `id, name, settings, interview_module_relation(recruiter_user(${interviewPlanRecruiterUserQuery}), interview_session_relation(training_type,interview_session(interview_meeting(status))))`,
    )
    .eq('recruiter_id', recruiter_id)
    .not('settings', 'is', null)
    .eq('interview_module_relation.training_status', 'training')
    .eq(
      'interview_module_relation.interview_session_relation.is_confirmed',
      true,
    )
    .in('interview_module_relation.interview_session_relation.training_type', [
      'shadow',
      'reverse_shadow',
    ] as (keyof SchedulingDashboardTypes['interviewTrainingProgress'][number]['count'])[])
    .eq(
      'interview_module_relation.interview_session_relation.interview_session.interview_meeting.status',
      'completed',
    );
  if (error) throw new Error(error.message);

  return data
    .reduce(
      (acc, { interview_module_relation, id, name, settings }) => {
        if (settings && interview_module_relation.length)
          acc.push(
            ...interview_module_relation.reduce(
              (acc, { interview_session_relation, recruiter_user }) => {
                const entry: SchedulingDashboardTypes['interviewTrainingProgress'][number] =
                  {
                    recruiter_user,
                    module: {
                      id,
                      name,
                      settings:
                        settings as SchedulingDashboardTypes['interviewTrainingProgress'][number]['module']['settings'],
                    },
                    count: { reverse_shadow: 0, shadow: 0 },
                  };
                if (interview_session_relation.length)
                  interview_session_relation.forEach((curr) => {
                    if (curr.interview_session.interview_meeting)
                      entry.count[curr.training_type] += 1;
                  });
                acc.push(entry);
                return acc;
              },
              [] as SchedulingDashboardTypes['interviewTrainingProgress'],
            ),
          );
        return acc;
      },
      [] as SchedulingDashboardTypes['interviewTrainingProgress'],
    )
    .sort((a, z) => sortHelper(z) - sortHelper(a));
};

const sortHelper = ({
  count,
}: SchedulingDashboardTypes['interviewTrainingProgress'][number]) => {
  return Object.values(count).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
};
