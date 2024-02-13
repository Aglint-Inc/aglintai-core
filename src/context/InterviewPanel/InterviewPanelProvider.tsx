import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  resetInterviewState,
  setApplicationList,
  setInitalLoading,
} from '@/src/components/Scheduling/Interview/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';
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

const InterviewPanelProvider = ({ children }) => {
  const { recruiter } = useAuthDetails();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
      initialInterviewFetch();
    }
    return () => {
      setInterviewPanels([]);
      resetInterviewState();
    };
  }, [recruiter?.id]);

  const initialFetch = async () => {
    try {
      const res = await fetchInterviewPanel(recruiter.id);
      if (res) {
        setInterviewPanels(res);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  const initialInterviewFetch = async () => {
    try {
      const { data: app, error: appError } = await supabase
        .from('applications')
        .select(
          `*,candidates (*),candidate_files (*),public_jobs (id,job_title)`,
        )
        .eq('status', 'interview');
      if (!appError) {
        const { data: intSch, error: intSchError } = await supabase
          .from('interview_schedule')
          .select(`*`)
          .in(
            'application_id',
            app.map((a) => a.id),
          );
        if (!intSchError) {
          const appWithSchedule = app.map((a) => {
            const schedule = intSch.find((i) => i.application_id === a.id);
            return {
              ...a,
              schedule: schedule || null,
            };
          });
          setApplicationList(appWithSchedule);
        }
      }
    } catch (error) {
      toast.error('Error fetching interview data');
    } finally {
      setInitalLoading(false);
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
