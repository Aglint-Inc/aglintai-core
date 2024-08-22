import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { initUser } from '@/src/pages/api/interviewers';
import { supabase } from '@/src/utils/supabase/client';

import { LeaderAnalyticsFilterType } from './types';

// -------------------------------------------------------- InterviewerLoad
export type useAllInterviewerType = Awaited<
  ReturnType<typeof useAllInterviewer>
>;

export function useAllInterviewer(recruiter_id: string) {
  return useQuery({
    queryKey: ['recruiter_id', recruiter_id],
    queryFn: () => fetchAllInterviewer(recruiter_id),
    enabled: Boolean(recruiter_id),
  });
}

const fetchAllInterviewer = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('all_interviewers')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);

  return data;
};

//------------------------------------------------------------- Availability

export type useAvailabiltyWithCalType = Awaited<
  ReturnType<typeof useAvailabilty>
>;

export const useAvailabilty = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    refetchOnMount: true,
    queryFn: () => fetchAvailabiltyWithCal(recruiter_id, startDate, endDate),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    });
  return { ...query, refetch };
};

const fetchAvailabiltyWithCal = async (
  recruiter_id: string,
  startDate: string,
  endDate: string,
) => {
  return axios
    .post('/api/interviewers', {
      recruiter_id,
      startDate,
      endDate,
    })
    .then((data) => {
      return data.data.data as initUser[];
    });
};

// -------------------------------------------------------- leader board

export type useLeaderBoardType = Awaited<
  ReturnType<typeof fetchLeaderBoardAnalytics>
>;

export const useLeaderBoard = ({
  type,
  jobs,
  departments,
}: {
  type: LeaderAnalyticsFilterType['type'];
  jobs?: LeaderAnalyticsFilterType['jobs'];
  departments: LeaderAnalyticsFilterType['departments'];
}) => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_leaderBoard-analytics', type, departments, recruiter_id],
    refetchOnMount: true,
    queryFn: () =>
      fetchLeaderBoardAnalytics({ recruiter_id, type, jobs, departments }),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_leaderBoard-analytics', recruiter_id],
    });
  return { ...query, refetch };
};

const fetchLeaderBoardAnalytics = async ({
  recruiter_id,
  type,
  jobs,
  departments,
}: {
  recruiter_id: string;
  type: LeaderAnalyticsFilterType['type'];
  jobs: LeaderAnalyticsFilterType['jobs'];
  departments: LeaderAnalyticsFilterType['departments'];
}) => {
  return (
    await supabase
      .rpc('scheduling_analytics_leaderboard', {
        recruiter_id,
        type,
        jobs,
        departments,
      })
      .throwOnError()
  ).data;
};
