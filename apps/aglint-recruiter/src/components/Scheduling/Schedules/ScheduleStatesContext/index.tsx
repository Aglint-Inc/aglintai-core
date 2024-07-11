/* eslint-disable no-unused-vars */
import { RecruiterUserType } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { ScheduleListType } from '../../Common/ModuleSchedules/hooks';

export type AssignerType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};
const initialFilterState = {
  status: [],
  interviewer: [],
  job: [],
  schedule_type: [],
  date_range: [],
};
interface ContextValue {
  filterSchedules: Awaited<ReturnType<typeof getAllScheduleList>> | null;
  setFilterSchedule: (
    x: Awaited<ReturnType<typeof getAllScheduleList>> | null,
  ) => void;
  loadingSchedules: boolean;
  setLoadingSchedules: (x: boolean) => void;
  filterState: typeof initialFilterState;
  setFilterState: (x: typeof initialFilterState) => void;
  updateFilterState: (
    key: keyof typeof initialFilterState,
    value: string[],
  ) => void;
}

const defaultProvider: ContextValue = {
  filterSchedules: null,
  setFilterSchedule: () => {},
  loadingSchedules: false,
  setLoadingSchedules: () => {},
  filterState: initialFilterState,
  setFilterState: () => {},
  updateFilterState: () => {},
};
const ScheduleStatesContext = createContext<ContextValue>(defaultProvider);
const useScheduleStatesContext = () => useContext(ScheduleStatesContext);
function ScheduleStatesProvider({ children }) {
  const [filterSchedules, setFilterSchedule] = useState<Awaited<
    ReturnType<typeof getAllScheduleList>
  > | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const [filterState, setFilterState] = useState(initialFilterState);

  const updateFilterState = (
    key: keyof typeof initialFilterState,
    value: string[],
  ) => {
    setFilterState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const {
    data: schedules,
    isLoading,
    isFetched,
  } = useAllScheduleList(filterState);

  useEffect(() => {
    setLoadingSchedules(isLoading);
    if (!isLoading && isFetched) setFilterSchedule(schedules);
  }, [schedules]);

  return (
    <ScheduleStatesContext.Provider
      value={{
        filterSchedules,
        setFilterSchedule,
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

export const useAllScheduleList = ({
  selectedInterviewers,
  selectedStatus,
  selectedJob,
  selectedScheduleType,
  selectedDateRange,
}: {
  selectedInterviewers: string[];
  selectedStatus: string[];
  selectedJob: string[];
  selectedScheduleType: string[];
  selectedDateRange: string[];
}) => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [
      'get_All_Schedule_List',

      selectedInterviewers,
      selectedStatus,
      selectedJob,
      selectedScheduleType,
      selectedDateRange,
    ],
    queryFn: () =>
      getAllScheduleList({
        selectedInterviewers,
        selectedStatus,
        selectedJob,
        selectedScheduleType,
        selectedDateRange,
        recruiter_id,
      }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_Schedule_List'] });
  return { ...query, refetch };
};

export async function getAllScheduleList({
  selectedInterviewers,
  selectedStatus,
  selectedJob,
  selectedScheduleType,
  selectedDateRange,
  recruiter_id,
}: {
  selectedInterviewers: string[];
  selectedStatus: string[];
  selectedJob: string[];
  selectedScheduleType: string[];
  selectedDateRange: string[];
  recruiter_id: string;
}) {
  // const { data, error } = await supabase.rpc(
  //   'get_interview_schedule_by_rec_id',
  //   {
  //     target_rec_id: recruiter_id,
  //   },
  // );
  const filters = supabase
    .from('meeting_details')
    .select(
      '*,applications(candidates(first_name,last_name)), public_jobs(id,company,job_title), meeting_interviewers(*)',
    )
    .eq('recruiter_id', recruiter_id)
    .eq('meeting_interviewers.is_confirmed', true);

  if (selectedJob.length > 0) {
    filters.in('job_id', selectedJob);
  }

  if (selectedStatus.length > 0) {
    filters.in('status', selectedStatus);
  }

  if (selectedScheduleType.length > 0) {
    filters.in('schedule_type', selectedScheduleType);
  }

  if (selectedDateRange.length === 2) {
    filters.gte('start_time', selectedDateRange[0]);
    filters.lte('end_time', selectedDateRange[1]);
  }

  if (selectedInterviewers.length > 0) {
    filters.in('meeting_interviewers.user_id', selectedInterviewers);
  }

  const { data: schedules, error } = await filters.throwOnError();
  console.log(schedules, error);

  return schedules;
}
