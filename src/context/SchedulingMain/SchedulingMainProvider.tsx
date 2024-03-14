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
import {
  MemberType,
  ModuleDashboard,
  ModuleType
} from '@/src/components/Scheduling/Modules/types';
import { fetchInterviewModuleById } from '@/src/components/Scheduling/Modules/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setEditModule } from '../../components/Scheduling/Modules/store';

export type InterviewPanelContextType = {
  loading: boolean;
  members: MemberType[];
  allModules: ModuleDashboard[];
  // eslint-disable-next-line no-unused-vars
  setAllModules: (x: ModuleDashboard[]) => void;
  fetchInterviewModules: () => void;
  fetchingModule: boolean;
  // eslint-disable-next-line no-unused-vars
  setFetchingModule: (x: boolean) => void;
};

const initialState = {
  loading: true,
  members: [],
  allModules: [],
  setAllModules: () => {},
  fetchInterviewModules: () => {},
  fetchingModule: false,
  setFetchingModule: () => {}
};

const AllSchedulingContext =
  createContext<InterviewPanelContextType>(initialState);

const SchedulingProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();
  const [loading, setLoading] = useState(true);
  const [fetchingModule, setFetchingModule] = useState(true);
  const [members, setMembers] = useState<InterviewPanelContextType['members']>(
    []
  );
  const router = useRouter();
  const [allModules, setAllModules] = useState<ModuleDashboard[]>([]);

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
  }, [recruiter?.id]);

  const fetchInterviewModules = async () => {
    const { data, error } = await supabase.rpc('get_interview_modules', {
      rec_id: recruiter.id
    });

    if (!error) {
      setAllModules(data as ModuleDashboard[]);
    }
  };

  const initialFetch = async () => {
    try {
      await fetchInterviewModules();
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
      (async () => {
        setFetchingModule(true);
        const resMod = await fetchInterviewModuleById(
          router.query.module_id as string
        );
        setEditModule(resMod as ModuleType);
        setFetchingModule(false);
      })();
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
    <AllSchedulingContext.Provider
      value={{
        loading,
        members,
        allModules,
        setAllModules,
        fetchInterviewModules,
        fetchingModule,
        setFetchingModule
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
