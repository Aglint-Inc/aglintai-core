import { cloneDeep, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { JobApplcationDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  ActionType,
  candDbContextType,
  CandidateStateType,
} from './candFilter.type';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

const initialState: CandidateStateType = {
  candidates: [],
  selectedCandidate: 0,
};

const candDb = createContext<candDbContextType>({
  candState: {
    candidates: [],
    selectedCandidate: -1,
  },
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: string; value: any }) => {},
  // eslint-disable-next-line no-unused-vars
  async handleAddCandidatesTojob(jobAppIds, job_ids) {},
});

const reducer = (state: CandidateStateType, action: ActionType) => {
  switch (action.type) {
    case 'UPDATE_STATE': {
      const { path, value } = action.payload;
      const updatedState = cloneDeep(state);
      set(updatedState, path, value);
      return updatedState;
    }

    default: {
      return state;
    }
  }
};

const CandDbProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateState = ({ path, value }: { path: string; value: any }) => {
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        path,
        value,
      },
    });
  };

  const handleAddCandidatesTojob = async (
    jobAppIds: string[],
    job_ids: { job_id: string; job_title: string }[],
  ) => {
    try {
      let updaCandState = [...state.candidates];
      const candsjobApps = supabaseWrap(
        await supabase
          .from('job_applications')
          .select()
          .or(jobAppIds.map((j) => `application_id.eq.${j}`).join(',')),
      ) as any[];

      let newJobApps: Partial<JobApplcationDB> & { candidate_id: string }[] =
        [];

      for (const candJobApp of candsjobApps) {
        let newCandApps = job_ids.map((j) => ({
          candidate_id: candJobApp.candidate_id,
          resume: candJobApp.resume,
          resume_text: candJobApp.resume_text,
          resume_embedding: candJobApp.resume_embedding,
          education_embedding: candJobApp.education_embedding,
          experience_embedding: candJobApp.experience_embedding,
          is_embedding: candJobApp.is_embedding,
          job_id: j.job_id,
          json_resume: candJobApp.json_resume,
          skills_embedding: candJobApp.skills_embedding,
        }));
        newJobApps = [...newJobApps, ...newCandApps];

        updaCandState = updaCandState.map((cand) => {
          if (cand.candidate_id === candJobApp.candidate_id) {
            cand.applied_job_posts = [...cand.applied_job_posts, ...job_ids];
          }
          return cand;
        });
      }

      updateState({
        path: 'candidates',
        value: updaCandState,
      });
      supabaseWrap(
        await supabase.from('job_applications').insert([...newJobApps]),
      );
      toast.success('Applied to job/s sucessfully');
    } catch (er) {
      toast.error(API_FAIL_MSG);
    }
  };

  return (
    <candDb.Provider
      value={{
        candState: state,
        updateState: updateState,
        handleAddCandidatesTojob,
      }}
    >
      {children}
    </candDb.Provider>
  );
};

export default CandDbProvider;

export const useCandFilter = () => {
  return useContext(candDb);
};
