import { create } from 'zustand';

type AssessmentCreateModalStore = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (newOpen: boolean) => void;
};
export const useAssessmentCreateEditModal = create<AssessmentCreateModalStore>(
  (set) => ({
    open: false,
    setOpen: (newOpen) => set(() => ({ open: newOpen })),
  }),
);
