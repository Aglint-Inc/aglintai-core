/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import { ScheduleListType } from '../../Common/ModuleSchedules';

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
  const { members } = useAuthDetails();
  const user_ids = members.map((ele) => ele.user_id);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_Schedule_List'],
    queryFn: () => getAllScheduleList(user_ids),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_Schedule_List'] });
  return { ...query, refetch };
};

async function getAllScheduleList(user_ids: string[]) {
  let schedules: ScheduleListType = [];
  for (let user_id of user_ids) {
    const { data } = await supabase.rpc(
      'new_get_interview_schedule_by_user_id',
      {
        target_user_id: user_id,
      },
    );

    schedules = [...schedules, ...data] as ScheduleListType;
  }

  return schedules.filter(
    (v, i, a) =>
      a.findIndex(
        (v2) =>
          v2.interview_meeting.meeting_id === v.interview_meeting.meeting_id,
      ) === i,
  );
}
