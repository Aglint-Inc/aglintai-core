import { type DatabaseEnums } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { cloneDeep, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  type ActionType,
  type candDbContextType,
  type CandidateStateType,
} from './candFilter.type';

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
          .from('applications')
          .select()
          .or(jobAppIds.map((j) => `id.eq.${j}`).join(',')),
      );
      let newJobApps: {
        candidate_id: string;
        job_id: string;
        candidate_file_id: string;
        source: DatabaseEnums['application_source'];
      }[] = [];
      for (const candJobApp of candsjobApps) {
        let newCandApps: typeof newJobApps = job_ids.map((j) => ({
          candidate_id: candJobApp.candidate_id,
          job_id: j.job_id,
          candidate_file_id: candJobApp.candidate_file_id,
          source: 'candidate_database',
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
      supabaseWrap(await supabase.from('applications').insert([...newJobApps]));
      toast.success('Applied to job successfully.');
    } catch (er) {
      toast.error('Something went wrong. Please try again.');
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
