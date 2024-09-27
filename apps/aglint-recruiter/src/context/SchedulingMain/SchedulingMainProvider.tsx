import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { type MemberType } from 'src/app/_common/types/memberType';

import { useTenant } from '@/company/hooks';
import {
  type ApiFetchUserDetails,
  type BodyParamsFetchUserDetails,
} from '@/pages/api/scheduling/fetchUserDetails';
import { supabase } from '@/utils/supabase/client';

type InterviewScheduleContextType = {
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
  const { recruiter } = useTenant();
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

      const bodyParams: BodyParamsFetchUserDetails = {
        recruiter_id: recruiter.id,
        includeSupended: false,
        isCalendar: true,
      };

      const resMem = await axios.post(
        '/api/scheduling/fetchUserDetails',
        bodyParams,
      );
      if (resMem.data) {
        setMembers(resMem.data as ApiFetchUserDetails);
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
