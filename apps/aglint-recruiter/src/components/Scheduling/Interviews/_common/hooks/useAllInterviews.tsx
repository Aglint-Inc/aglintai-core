import { dayjsLocal } from '@aglint/shared-utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { schedulesSupabase } from 'src/app/_common/utils/schedules-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { type ScheduleFilerType } from '../types';

export const useAllInterviews = (filters: ScheduleFilerType) => {
  const {
    date,
    interviewers,
    jobs,
    schedule_types,
    status,
    searchText,
    session_types,
  } = filters;
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [
      'get_All_Interviews',
      ...status,
      ...jobs,
      ...schedule_types,
      ...interviewers,
      ...date,
      ...session_types,
      searchText,
    ],

    queryFn: () =>
      getAllInterviews({
        filters,
        recruiter_id,
      }),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_Interviews'] });
  return { ...query, refetch };
};

export async function getAllInterviews({
  filters,
  recruiter_id,
}: {
  filters: ScheduleFilerType;
  recruiter_id: string;
}) {
  const {
    date,
    interviewers,
    jobs,
    schedule_types,
    status,
    searchText,
    session_types,
  } = filters;
  const filtersAll = schedulesSupabase()
    .eq('recruiter_id', recruiter_id)
    .eq('meeting_interviewers.is_confirmed', true);
  if (jobs.length > 0) {
    filtersAll.in('job_id', jobs);
  }

  if (status.length > 0) {
    filtersAll.in('status', status);
  }

  if (schedule_types.length > 0) {
    filtersAll.in('schedule_type', schedule_types);
  }
  if (session_types.length > 0) {
    filtersAll.in('session_type', session_types);
  }

  if (date.length > 0) {
    let selectedDate = null;
    if (date[0] === 'today') {
      selectedDate = dayjsLocal().format('YYYY-MM-DD');
    }
    if (date[0] === 'tomorrow') {
      selectedDate = dayjsLocal().add(1, 'day').format('YYYY-MM-DD');
    }
    if (date[0] === 'next_7_days') {
      selectedDate = dayjsLocal().add(7, 'day').format('YYYY-MM-DD');
    }
    if (date[0] === 'next_30_days') {
      selectedDate = dayjsLocal().add(30, 'day').format('YYYY-MM-DD');
    }
    if (date[0] === 'last_7_days') {
      selectedDate = dayjsLocal().add(-7, 'day').format('YYYY-MM-DD');
    }
    if (date[0] === 'last_30_days') {
      selectedDate = dayjsLocal().add(-30, 'day').format('YYYY-MM-DD');
    }
    if (selectedDate === dayjsLocal().format('YYYY-MM-DD')) {
      filtersAll.gte('start_time', selectedDate);
      filtersAll.lt(
        'start_time',
        dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      );
    } else if (
      selectedDate === dayjsLocal().add(1, 'day').format('YYYY-MM-DD')
    ) {
      filtersAll.gte('start_time', selectedDate);
      filtersAll.lt(
        'start_time',
        dayjsLocal().add(2, 'day').format('YYYY-MM-DD'),
      );
    } else {
      if (dayjsLocal(selectedDate).isAfter(dayjsLocal())) {
        // checking if date is after current date
        filtersAll.lte('start_time', selectedDate);
        filtersAll.gte('start_time', dayjsLocal().format('YYYY-MM-DD'));
      } else {
        filtersAll.gte('start_time', selectedDate);
        filtersAll.lte('start_time', dayjsLocal().format('YYYY-MM-DD'));
      }
    }
  }
  if (searchText) {
    filtersAll.ilike('session_name', `%${searchText}%`);
  }

  if (interviewers.length > 0) {
    filtersAll.contains('confirmed_user_ids', interviewers);
  }

  const { data: schedules } = await filtersAll
    .order('start_time', { ascending: true })
    .throwOnError();
  return schedules;
}
