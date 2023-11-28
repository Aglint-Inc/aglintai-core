import { cloneDeep, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import {
  ActionType,
  candDbContextType,
  CandidateStateType,
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

  return (
    <candDb.Provider
      value={{
        candState: state,
        updateState: updateState,
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
