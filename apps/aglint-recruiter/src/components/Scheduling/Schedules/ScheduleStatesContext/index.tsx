/* eslint-disable no-unused-vars */
import { DatabaseEnums, RecruiterUserType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useLocalStorage } from '@/src/hooks/useLocalStorage';

import { SchedulesSupabase, schedulesSupabase } from '../../schedules-query';

export type AssignerType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};
export type interviewDateRangeType =
  | 'today'
  | 'tomorrow'
  | 'last_7_days'
  | 'last_30_days'
  | 'next_7_days'
  | 'next_30_days'
  | 'date_range';
export type ScheduleFilerType = {
  status: DatabaseEnums['interview_schedule_status'][];
  interviewers: string[];
  jobs: string[];
  schedule_types: string[];
  date: interviewDateRangeType[];
  session_types: DatabaseEnums['session_type'][];
  searchText: string;
};
export var initialFilterState: ScheduleFilerType = {
  status: ['confirmed', 'completed'],
  interviewers: [],
  jobs: [],
  schedule_types: [],
  date: [],
  session_types: [],
  searchText: null,
};
interface ContextValue {
  filteredSchedules: SchedulesSupabase | null;
  setFilteredSchedule: (x: SchedulesSupabase | null) => void;
  loadingSchedules: boolean;
  setLoadingSchedules: (x: boolean) => void;
  filterState: typeof initialFilterState;
  setFilterState: (x: typeof initialFilterState) => void;
  updateFilterState: (
    key: keyof typeof initialFilterState,
    value: string[] | string,
  ) => void;
}

const defaultProvider: ContextValue = {
  filteredSchedules: null,
  setFilteredSchedule: () => {},
  loadingSchedules: false,
  setLoadingSchedules: () => {},
  filterState: initialFilterState,
  setFilterState: () => {},
  updateFilterState: () => {},
};
const ScheduleStatesContext = createContext<ContextValue>(defaultProvider);
const useScheduleStatesContext = () => useContext(ScheduleStatesContext);
function ScheduleStatesProvider({ children }) {
  const [filteredSchedules, setFilteredSchedule] =
    useState<SchedulesSupabase | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const [scheduleFilterIds, setScheduleFilterIds] =
    useLocalStorage('scheduleFilterIds');

  const [filterState, setFilterState] = useState(initialFilterState);
  useEffect(() => {
    if (scheduleFilterIds) {
      setFilterState({
        date: scheduleFilterIds?.date || [],
        interviewers: scheduleFilterIds?.interviewers || [],
        jobs: scheduleFilterIds?.jobs || [],
        schedule_types: scheduleFilterIds?.schedule_types || [],
        session_types: scheduleFilterIds?.session_types || [],
        searchText: scheduleFilterIds?.searchText || '',
        status: scheduleFilterIds?.status || [],
      });
    }
  }, [scheduleFilterIds]);
  const updateFilterState = (
    key: keyof typeof initialFilterState,
    value: string[],
  ) => {
    setFilterState((prevState) => {
      let states = {
        ...prevState,
        [key]: value,
      };
      setScheduleFilterIds({
        ...states,
      });

      return states;
    });
  };

  const {
    data: schedules,
    isLoading,
    isFetched,
  } = useAllScheduleList({ ...filterState });
  useEffect(() => {
    setLoadingSchedules(isLoading);
    if (!isLoading && isFetched) setFilteredSchedule(schedules);
  }, [filterState, schedules]);

  return (
    <ScheduleStatesContext.Provider
      value={{
        filteredSchedules,
        setFilteredSchedule,
        loadingSchedules,
        setLoadingSchedules,
        filterState,
        setFilterState,
        updateFilterState,
      }}
    >
      {children}
    </ScheduleStatesContext.Provider>
  );
}

export { ScheduleStatesProvider, useScheduleStatesContext };

export const useAllScheduleList = (filters: ScheduleFilerType) => {
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
      'get_All_Schedule_List',
      ...status,
      ...jobs,
      ...schedule_types,
      ...interviewers,
      ...date,
      ...session_types,
      searchText,
    ],

    queryFn: () =>
      getAllScheduleList({
        filters,
        recruiter_id,
      }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_Schedule_List'] });
  return { ...query, refetch };
};

export async function getAllScheduleList({
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
