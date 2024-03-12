import axios from 'axios';
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
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setInterviewModules,
  useSchedulingStore
} from '../../components/Scheduling/Modules/store';

export type InterviewPanelContextType = {
  loading: boolean;
  members: MemberType[];
};

export type MemberType = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  position: string;
};

const initialState = {
  loading: true,
  members: []
};

const InterviewPanelContext =
  createContext<InterviewPanelContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<InterviewPanelContextType['members']>(
    []
  );
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
      const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
        recruiter_id: recruiter.id
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
    if (router.isReady && router.query.module_id && !loading) {
      const selModule = interviewModules.filter(
        (m) => m.id === router.query.module_id
      )[0];

      if (selModule) {
        setEditModule(selModule);
      }
    }
  }, [router, loading]);

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
    <InterviewPanelContext.Provider value={{ loading, members }}>
      {children}
    </InterviewPanelContext.Provider>
  );
};

export default SchedulingProvider;

export const useSchedulingContext = () => {
  return useContext(InterviewPanelContext);
};
