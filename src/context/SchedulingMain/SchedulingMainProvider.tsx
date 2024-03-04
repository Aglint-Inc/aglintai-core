import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { resetInterviewState } from '@/src/components/Scheduling/Agent/store';
import {
  ApplicationList,
  setApplicationList,
  setInitalLoading,
  setPagination
} from '@/src/components/Scheduling/AllSchedules/store';
import { fetchInterviewModule } from '@/src/components/Scheduling/Modules/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setInterviewModules,
  setModuleName,
  useSchedulingStore
} from '../../components/Scheduling/Modules/store';

type InterviewPanelContextType = {
  loading: boolean;
};

const initialState = {
  loading: true
};

const InterviewPanelContext =
  createContext<InterviewPanelContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { interviewModules } = useSchedulingStore();

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
    if (router.isReady && router.query.module_id && !loading) {
      const selModule = interviewModules.filter(
        (m) => m.id === router.query.module_id
      )[0];

      if (selModule) {
        setModuleName(selModule.name);
        setEditModule(selModule);
      }
    }
  }, [router, loading]);

  useEffect(() => {
    if (
      router.isReady &&
      !router.query.tab &&
      !router.pathname.includes('/module/')
    ) {
      router.push(`${pageRoutes.SCHEDULING}?tab=allSchedules`, undefined, {
        shallow: true
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

export default SchedulingProvider;

export const useScheduling = () => {
  return useContext(InterviewPanelContext);
};
