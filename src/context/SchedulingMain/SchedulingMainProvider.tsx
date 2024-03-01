import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  ApplicationList,
  resetInterviewState,
  setApplicationList,
  setInitalLoading,
  setPagination,
} from '@/src/components/Scheduling/Interview/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setInterviewPanels } from '../../components/Scheduling/Panels/store';
import { fetchInterviewPanel } from '../../components/Scheduling/Panels/utils';

type InterviewPanelContextType = {
  loading: boolean;
};

const initialState = {
  loading: true,
};

const InterviewPanelContext =
  createContext<InterviewPanelContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
    return () => {
      setInterviewPanels([]);
    };
  }, [recruiter?.id]);

  const initialFetch = async () => {
    try {
      const res: any = await fetchInterviewPanel(recruiter.id);
      if (res) {
        setInterviewPanels(res);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      router.push(`${pageRoutes.SCHEDULING}?tab=allSchedules`, undefined, {
        shallow: true,
      });
    }
  }, [router]);

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
    <InterviewPanelContext.Provider value={{ loading }}>
      {children}
    </InterviewPanelContext.Provider>
  );
};

export default SchedulingProvider;

export const useScheduling = () => {
  return useContext(InterviewPanelContext);
};
