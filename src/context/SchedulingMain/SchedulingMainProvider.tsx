import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

// import { resetInterviewState } from '@/src/components/Scheduling/Agent/store';
import { MemberType } from '@/src/components/Scheduling/Modules/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

export type InterviewScheduleContextType = {
  loading: boolean;
  members: MemberType[];
  allModules: { id: string; name: string }[];
};

const initialState = {
  loading: true,
  members: [],
  allModules: [],
};

const AllSchedulingContext =
  createContext<InterviewScheduleContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<
    InterviewScheduleContextType['members']
  >([]);
  const [allModules, setAllModules] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
    // return () => {
    //   resetInterviewState();
    // };
  }, [recruiter?.id]);

  const initialFetch = async () => {
    try {
      const { data: modules, error: moduleError } = await supabase
        .from('interview_module')
        .select('id,name')
        .eq('recruiter_id', recruiter.id);

      if (!moduleError) {
        setAllModules(modules);
      }

      const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
        recruiter_id: recruiter.id,
      });
      if (resMem.data) {
        setMembers(resMem.data);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  return (
    <AllSchedulingContext.Provider
      value={{
        loading,
        members,
        allModules,
      }}
    >
      {children}
    </AllSchedulingContext.Provider>
  );
};

export default SchedulingProvider;

export const useSchedulingContext = () => {
  return useContext(AllSchedulingContext);
};
