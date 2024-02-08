import { create } from 'zustand';

import {
  CandidateDatabaseSlice,
  createCandidateDatabaseSlice,
} from './components/CandidateDatabase/AppoloSearch/store';
import {
  createSchedulingSlice,
  SchedulingSlice,
} from './components/Scheduling/store';

export const useBoundStore = create<CandidateDatabaseSlice & SchedulingSlice>(
  (...a) => ({
    ...createCandidateDatabaseSlice(...a),
    ...createSchedulingSlice(...a),
  }),
);
