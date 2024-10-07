'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { type SchedulesSupabase } from 'src/app/_common/utils/schedules-query';

import { useLocalStorage } from '@/hooks/useLocalStorage';

import { initialFilterState, upComingInitialFilterState } from '../types';

interface ContextValue {
  filteredSchedules: SchedulesSupabase | null;
  setFilteredSchedule: (_x: SchedulesSupabase | null) => void;
  loadingSchedules: boolean;
  setLoadingSchedules: (_x: boolean) => void;
  upcomingFilterState: typeof upComingInitialFilterState;
  setUpcomingFilterState: (_x: typeof upComingInitialFilterState) => void;
  filterState: typeof initialFilterState;
  setFilterState: (_x: typeof initialFilterState) => void;
  updateFilterState: (
    _key: keyof typeof initialFilterState,
    _value: string[] | string,
  ) => void;
  updateUpComingFilterState: (
    _key: keyof typeof upComingInitialFilterState,
    _value: string[] | string,
  ) => void;
}

const defaultProvider: ContextValue = {
  filteredSchedules: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilteredSchedule: () => {},
  loadingSchedules: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoadingSchedules: () => {},
  upcomingFilterState: upComingInitialFilterState,
  filterState: initialFilterState,
  setFilterState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUpcomingFilterState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFilterState: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUpComingFilterState: () => {},
};
const ScheduleStatesContext = createContext<ContextValue>(defaultProvider);
const useScheduleStatesContext = () => useContext(ScheduleStatesContext);
function ScheduleStatesProvider({ children }: { children: React.ReactNode }) {
  const [filteredSchedules, setFilteredSchedule] =
    useState<SchedulesSupabase | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const [scheduleFilterIds, setScheduleFilterIds] =
    useLocalStorage('scheduleFilterIds');

  const [upcomingFilterState, setUpcomingFilterState] = useState(
    upComingInitialFilterState,
  );
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
    value: string[] | string,
  ) => {
    setFilterState((prevState) => {
      const states = {
        ...prevState,
        [key]: value,
      };
      setScheduleFilterIds({
        ...states,
      });
      return states;
    });
  };
  const updateUpComingFilterState = (
    key: keyof typeof upComingInitialFilterState,
    value: string[] | string,
  ) => {
    setUpcomingFilterState((prevState) => {
      const states = {
        ...prevState,
        [key]: value,
      };
      setScheduleFilterIds({
        ...states,
      });
      return states;
    });
  };

  return (
    <ScheduleStatesContext.Provider
      value={{
        filteredSchedules,
        setFilteredSchedule,
        loadingSchedules,
        setLoadingSchedules,
        upcomingFilterState,
        setUpcomingFilterState,
        updateFilterState,
        filterState,
        setFilterState,
        updateUpComingFilterState,
      }}
    >
      {children}
    </ScheduleStatesContext.Provider>
  );
}

export { ScheduleStatesProvider, useScheduleStatesContext };
