import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

import { resetInterviewState } from '@/src/components/Scheduling/Agent/store';
import {
  ApplicationList,
  setApplicationList,
  setInitalLoading,
  setPagination,
} from '@/src/components/Scheduling/AllSchedules/store';
import { MemberType } from '@/src/components/Scheduling/Modules/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export type InterviewPanelContextType = {
  loading: boolean;
  members: MemberType[];
};

const initialState = {
  loading: true,
  members: [],
};

const AllSchedulingContext =
  createContext<InterviewPanelContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<InterviewPanelContextType['members']>(
    [],
  );

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
  }, [recruiter?.id]);

  const initialFetch = async () => {
    try {
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

  useEffect(() => {
    if (recruiter?.id) {
      initialInterviewFetch();
    }
    return () => {
      resetInterviewState();
    };
  }, []);

  const initialInterviewFetch = async () => {
    try {
      getPaginationData();
      const { data: appNew, error } = await supabase.rpc(
        'fetch_interview_data',
        {
          rec_id: recruiter.id,
        },
      );
      if (error) {
        throw new Error(error.message);
      }
      setApplicationList(appNew as ApplicationList[]);
    } catch (error) {
      toast.error('Error fetching interview data');
    } finally {
      setInitalLoading(false);
    }
  };

  const getPaginationData = async () => {
    try {
      const { data, error } = await supabase.rpc('get_interview_data_count', {
        rec_id: recruiter.id,
      });
      setPagination({ total: data });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      toast.error('Error fetching interview data');
    }
  };

  return (
    <AllSchedulingContext.Provider
      value={{
        loading,
        members,
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
