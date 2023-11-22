import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import React, { createContext, useContext, useReducer } from 'react';

import { JsonResume } from '@/src/types/resume_json.types';

export interface CandidateSearchRes {
  application_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  json_resume: JsonResume;
  similarity: number;
  profile_image?: string;
  resume_link: string;
}

export type CandidateSearchState = {
  queryJson: {
    jobTitles: string[];
    location: string[];
    languages: string[];
    minExp: number;
    maxExp: number;
    universities: string[];
    prefferedCompanies: string[];
    excludedCompanies: string[];
    skills: string[];
    degrees: string[];
  };
  candidates: CandidateSearchRes[];
  maxProfiles: number;
};
export type CandidateSearchCtxType = {
  candidateSearchState: CandidateSearchState;
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: string; value: any }) => void;
  // eslint-disable-next-line no-unused-vars
  updatenewSearchRes: (newState: CandidateSearchState) => void;
};

type ActionType =
  | {
      type: 'UPDATE_STATE';
      payload: {
        path: string;
        value: any;
      };
    }
  | {
      type: 'replaceState';
      payload: {
        newState: CandidateSearchState;
      };
    };

const reducer = (state: CandidateSearchState, action: ActionType) => {
  const nextState = cloneDeep(state);

  switch (action.type) {
    case 'UPDATE_STATE': {
      set(nextState, action.payload.path, action.payload.value);
      return nextState;
    }
    case 'replaceState': {
      const { newState } = action.payload;
      return cloneDeep(newState);
    }
    default:
      return state;
  }
};

export const initialState: CandidateSearchState = {
  candidates: [],
  queryJson: {
    jobTitles: [],
    languages: [],
    location: [],
    maxExp: 0,
    minExp: 0,
    universities: [],
    excludedCompanies: [],
    prefferedCompanies: [],
    skills: [],
    degrees: [],
  },
  maxProfiles: 25,
};

const CandidateSearchCtx = createContext<CandidateSearchCtxType>({
  candidateSearchState: initialState,
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path = '', value = '' }) => {},
  // eslint-disable-next-line no-unused-vars
  updatenewSearchRes: (newState: CandidateSearchState) => {},
});

const CandidateSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateState = ({ path, value }) => {
    dispatch({ type: 'UPDATE_STATE', payload: { path, value } });
  };

  const updatenewSearchRes = (newState: CandidateSearchState) => {
    dispatch({
      type: 'replaceState',
      payload: {
        newState,
      },
    });
  };

  return (
    <CandidateSearchCtx.Provider
      value={{
        candidateSearchState: state,
        updateState,
        updatenewSearchRes,
      }}
    >
      {children}
    </CandidateSearchCtx.Provider>
  );
};

export default CandidateSearchProvider;

export const useCandidateSearchCtx = () => {
  return useContext(CandidateSearchCtx);
};
