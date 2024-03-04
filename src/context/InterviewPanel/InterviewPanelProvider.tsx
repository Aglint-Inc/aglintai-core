import { createContext, useContext, useEffect, useState } from 'react';

import {
  ApplicationList,
  resetInterviewState,
  setApplicationList,
  setInitalLoading,
  setPagination
} from '@/src/components/Scheduling/AllSchedules/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setInterviewModules } from '../../components/Scheduling/Modules/store';
import { fetchInterviewModule } from '../../components/Scheduling/Modules/utils';

type InterviewPanelContextType = {
  loading: boolean;
};

const initialState = {
  loading: true
};

const InterviewPanelContext =
  createContext<InterviewPanelContextType>(initialState);

const InterviewPanelProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
    return () => {
      setInterviewModules([]);
    };
  }, [recruiter?.id]);

  const initialFetch = async () => {
    try {
      const res: any = await fetchInterviewModule(recruiter.id);
      if (res) {
        setInterviewModules(res);
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
          rec_id: recruiter.id
        }
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
        rec_id: recruiter.id
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
    <InterviewPanelContext.Provider value={{ loading }}>
      {children}
    </InterviewPanelContext.Provider>
  );
};

export default InterviewPanelProvider;

export const useInterviewPanel = () => {
  return useContext(InterviewPanelContext);
};
