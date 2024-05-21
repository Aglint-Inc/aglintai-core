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
interface ContextValue {
  allSchedules: ScheduleListType | null;
  setAllSchedules: (x: ScheduleListType | null) => void;
  filterSchedules: ScheduleListType;
  setFilterSchedule: (x: ScheduleListType | null) => void;
  loadingSchedules: boolean;
  setLoadingSchedules: (x: boolean) => void;
}

const defaultProvider: ContextValue = {
  allSchedules: null,
  setAllSchedules: () => {},
  filterSchedules: null,
  setFilterSchedule: () => {},
  loadingSchedules: false,
  setLoadingSchedules: () => {},
};
const ScheduleStatesContext = createContext<ContextValue>(defaultProvider);
const useScheduleStatesContext = () => useContext(ScheduleStatesContext);
function ScheduleStatesProvider({ children }) {
  const [allSchedules, setAllSchedules] = useState<ScheduleListType | null>(
    null,
  );
  const [filterSchedules, setFilterSchedule] =
    useState<ScheduleListType | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const { data: schedules, isLoading, isFetched } = useAllScheduleList();
  useEffect(() => {
    if (!isLoading && isFetched) {
      setAllSchedules((schedules || []) as ScheduleListType);
      setFilterSchedule((schedules || []) as ScheduleListType);
    }
  }, [isLoading, isFetched]);
  return (
    <ScheduleStatesContext.Provider
      value={{
        allSchedules,
        setAllSchedules,
        filterSchedules,
        setFilterSchedule,
        loadingSchedules,
        setLoadingSchedules,
      }}
    >
      {children}
    </ScheduleStatesContext.Provider>
  );
}

export { ScheduleStatesProvider, useScheduleStatesContext };

export const useAllScheduleList = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_Schedule_List'],
    queryFn: () => getAllScheduleList(recruiter_id),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_Schedule_List'] });
  return { ...query, refetch };
};

async function getAllScheduleList(recruiter_id: string) {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_rec_id',
    {
      target_rec_id: recruiter_id,
    },
  );
  if (error) throw new Error();
  return data as unknown as ScheduleListType;
}
