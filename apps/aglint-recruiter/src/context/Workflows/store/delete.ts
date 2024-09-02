import { type Workflow } from '@/src/types/workflow.types';

import { type CreateSlice } from '.';

type Deletion = {
  open: boolean;
  workflow: Pick<Workflow, 'id' | 'jobs'>;
};

export type DeletionSlice = {
  deletion: Deletion;
  // eslint-disable-next-line no-unused-vars
  setDeletion: (deletion: Deletion) => void;
  closeDeletion: () => void;
};

const initialDeletion: Deletion = {
  open: false,
  workflow: null,
};

export const createDeletionSlice: CreateSlice<DeletionSlice> = (set) => ({
  deletion: initialDeletion,
  setDeletion: (deletion) => set({ deletion }),
  closeDeletion: () => {
    set((state) => ({ deletion: { ...state.deletion, open: false } }));
    setTimeout(
      () =>
        set((state) => ({ deletion: { ...state.deletion, workflow: null } })),
      400,
    );
  },
});
