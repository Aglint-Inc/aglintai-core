import { create } from 'zustand';

import {
  CandidateDatabaseSlice,
  createCandidateDatabaseSlice,
} from './components/CandidateDatabase/AppoloSearch/store';

export const useBoundStore = create<CandidateDatabaseSlice>((...a) => ({
  ...createCandidateDatabaseSlice(...a),
}));
