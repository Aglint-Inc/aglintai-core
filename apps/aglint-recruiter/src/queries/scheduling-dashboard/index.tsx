import { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getInterviewTrainingProgressType } from '@/src/pages/api/scheduling/get_interview_training_progress';
import { supabase } from '@/src/utils/supabase/client';

import { getNthDateFromToday, groupDateBy } from '../utils';
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
    queryFn: () => getInterviewTrainingProgressAPI({ recruiter_id }),
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

export const useScheduleSessionsAnalytics = () => {
  const { recruiter } = useAuthDetails();
  const { queryKey } = schedulingDashboardQueryKeys.sessionsAnalyticsData({
    recruiter_id: recruiter.id,
  });
  return useQuery({
    queryKey,
    queryFn: () => {
      return getAnalyticsData(recruiter.id);
    },
    enabled: Boolean(recruiter.id),
    refetchOnWindowFocus: false,
  });
};

export const useCancelRescheduleReasons = () => {
  const { recruiter } = useAuthDetails();
  const { queryKey } = schedulingDashboardQueryKeys.CancelRescheduleReasons({
    recruiter_id: recruiter.id,
  });
  return useQuery({
    queryKey,
    queryFn: () => getCancelRescheduleReasons(recruiter.id),
  });
};

export const useCancelRescheduleReasonsUsers = () => {
  const { recruiter } = useAuthDetails();
  const { data, isPending: loading1 } = useScheduleSessionsAnalytics();
  const { data: CancelRescheduleReasons, isPending: loading2 } =
    useCancelRescheduleReasons();
  const users = CancelRescheduleReasons?.reduce(
    (acc, curr) => {
      const temp_item = data.find(
        (item) => item.interview_session.id == curr.session_id,
      );

      if (
        curr.session_relation_id == null &&
        temp_item?.interview_schedule.application_id
      ) {
        acc['candidate'].add(temp_item.interview_schedule.application_id);
      } else if (curr.session_relation_id) {
        acc['interviewer'].add(curr.session_relation_id);
      }
      return acc;
    },
    { candidate: new Set(), interviewer: new Set() } as {
      candidate: Set<string>;
      interviewer: Set<string>;
    },
  );
  const { queryKey } = schedulingDashboardQueryKeys.CancelRescheduleReasonsUser(
    {
      recruiter_id: recruiter.id,
    },
  );

  return {
    parentFetching: loading1 && loading2,
    disabled: !(users?.candidate.size || users?.interviewer.size),
    ...useQuery({
      queryKey,
      queryFn: async () => {
        const candidate =
          (await getCandidatesByAppId([...users.candidate])) || [];
        const interviewer =
          (await getInterviewerByRelationId([...users.interviewer])) || [];
        return { candidate, interviewer };
      },
      enabled:
        (loading1 && loading2 && Boolean(users?.candidate.size)) ||
        Boolean(users?.interviewer.size),
    }),
  };
};

export const useCompletedInterviewDetails = () => {
  const [filterDuration, setFilterDuration] = useState<8 | 1>(1);
  const type = filterDuration == 1 ? 'week' : 'month';
  const { queryKey } = schedulingDashboardQueryKeys.CompletedInterviewDetails({
    type,
  });
  const query = useQuery({
    queryKey,
    queryFn: () =>
      getCompletedInterviewDetails({
        filterFromDate: getNthDateFromToday(
          filterDuration == 1
            ? { n: -30, unit: 'days' }
            : { n: -8, unit: 'months' },
        ),
      }).then((data) => {
        return groupDateBy(data, filterDuration == 1 ? 'week' : 'month');
      }),
  });
  return {
    ...query,
    type,
    setFilterDuration,
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

const getAnalyticsData = async (rec_id: string) => {
  return (
    supabase
      .from('interview_schedule')
      .select('*,interview_meeting(*,interview_session(*))')
      // .eq('interview_schedule.recruiter_id', rec_id)
      .match({ recruiter_id: rec_id })
      .throwOnError()
      .then(({ data }) =>
        data.reduce(
          (acc, curr) => {
            curr.interview_meeting.map((item) => {
              const temp: (typeof acc)[0] = {
                interview_meeting: null,
                interview_schedule: null,
                interview_session: null,
              };
              temp['interview_session'] = item.interview_session[0];
              delete item.interview_session;
              temp['interview_meeting'] = item;
              const interview_schedule = {
                ...curr,
                interview_meeting: undefined,
              };
              const temp_schedule = { ...interview_schedule };
              delete temp_schedule.interview_meeting;
              temp['interview_schedule'] = temp_schedule;

              acc.push(temp);
            });
            return acc;
          },
          [] as {
            interview_meeting: DatabaseTable['interview_meeting'];
            interview_schedule: DatabaseTable['interview_schedule'];
            interview_session: DatabaseTable['interview_session'];
          }[],
        ),
      )
  );
};

const getCancelRescheduleReasons = async (rec_id: string) => {
  return supabase
    .from('interview_session_cancel')
    .select(
      '*,interview_session(interview_meeting(interview_schedule(recruiter_id)))',
    )
    .eq(
      'interview_session.interview_meeting.interview_schedule.recruiter_id',
      rec_id,
    )
    .throwOnError()
    .then(({ data }) => data);
};

const getCandidatesByAppId = async (application_ids: string[]) => {
  return supabase
    .from('applications')
    .select('id, candidates(id, first_name, last_name)')
    .in('id', application_ids)
    .then(({ data }) => {
      return data
        .filter((item) => Boolean(item.candidates))
        .reduce(
          (acc, curr) => {
            acc[curr.id] = {
              id: curr.candidates.id,
              name: `${curr.candidates.first_name} ${curr.candidates.last_name}`.trim(),
              profile_image: null,
            };
            return acc;
          },
          {} as {
            [key: string]: { id: string; name: string; profile_image: string };
          },
        );
    });
};

const getInterviewerByRelationId = async (relation_ids: string[]) => {
  return supabase
    .from('interview_session_relation')
    .select(
      'id, recruiter_user( user_id, first_name, last_name, profile_image )',
    )
    .in('id', relation_ids)
    .then(({ data }) => {
      return data
        .filter((item) => Boolean(item.recruiter_user))
        .reduce(
          (acc, curr) => {
            acc[curr.id] = {
              id: curr.recruiter_user.user_id,
              name: `${curr.recruiter_user.first_name} ${curr.recruiter_user.last_name}`.trim(),
              profile_image: curr.recruiter_user.profile_image,
            };
            return acc;
          },
          {} as {
            [key: string]: { id: string; name: string; profile_image: string };
          },
        );
    });
};

const getCompletedInterviewDetails = async ({
  filterFromDate,
}: {
  filterFromDate: string;
}) => {
  return supabase
    .from('interview_meeting')
    .select('created_at')
    .eq('status', 'completed')
    .gt('created_at', filterFromDate)
    .then(({ data }) => {
      return data.map((x) => ({ date: x.created_at }));
    });
};
